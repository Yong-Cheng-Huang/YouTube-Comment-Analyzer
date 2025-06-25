import { useState, useEffect } from 'react';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown, faSortAmountUp, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [answerLang, setAnswerLang] = useState('en');
  const [sortOption, setSortOption] = useState('time');

  // --- localStorage persist ---
  useEffect(() => {
    setApiKey(localStorage.getItem('apiKey') || '');
    setGeminiKey(localStorage.getItem('geminiKey') || '');
    setVideoUrl(localStorage.getItem('videoUrl') || '');
    setAnalysis(localStorage.getItem('analysis') || '');
    const savedComments = localStorage.getItem('comments');
    if (savedComments) setComments(JSON.parse(savedComments));
    setAnswerLang(localStorage.getItem('answerLang') || 'zh');
  }, []);
  useEffect(() => { localStorage.setItem('apiKey', apiKey); }, [apiKey]);
  useEffect(() => { localStorage.setItem('geminiKey', geminiKey); }, [geminiKey]);
  useEffect(() => { localStorage.setItem('videoUrl', videoUrl); }, [videoUrl]);
  useEffect(() => { localStorage.setItem('analysis', analysis); }, [analysis]);
  useEffect(() => { localStorage.setItem('comments', JSON.stringify(comments)); }, [comments]);
  useEffect(() => { localStorage.setItem('answerLang', answerLang); }, [answerLang]);

  const extractVideoId = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const fetchComments = async () => {
    if (!apiKey) {
      setError('Please enter your YouTube API Key in Advanced Settings.');
      return;
    }
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      setError('Invalid YouTube URL. Please check the format.');
      return;
    }

    setLoading(true);
    setError('');
    setComments([]);
    setVideoUrl('');
    setAnalysis('');
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=100&order=relevance`
      );
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error?.message || `HTTP error! Status: ${response.status}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const commentsData = data.items.map((item: any) => ({
          id: item.id,
          author: item.snippet.topLevelComment.snippet.authorDisplayName,
          authorProfileImageUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
          text: item.snippet.topLevelComment.snippet.textOriginal,
          likeCount: item.snippet.topLevelComment.snippet.likeCount,
          publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
        }));
        setComments(commentsData);
      } else {
        setError('No comments found or comments are disabled for this video.');
      }
    } catch (err: any) {
      setError(`Failed to fetch comments: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const analyzeCommentsWithGemini = async () => {
    if (!geminiKey) {
      setError('Please enter your Gemini API Key.');
      return;
    }
    if (comments.length === 0) {
      setError('Please fetch comments first.');
      return;
    }
    setAnalyzing(true);
    setError('');
    setAnalysis('');
    try {
      let prompt = '';
      if (answerLang === 'zh') {
        prompt = `\n請根據下列 YouTube 影片評論，幫我分析：\n1. 最常被問的問題\n2. 常見的痛點\n3. 觀眾希望看到的後續內容\n4. 情緒傾向（如：挫折、興奮、困惑等）\n5. 觀眾想進一步了解的主題\n6. 需要澄清的常見誤解\n\n評論如下：\n${comments.map((c, i) => `${i + 1}. ${c.text}`).join('\\n')}\n請用條列式中文回答。\n        `.trim();
      } else {
        prompt = `\nPlease analyze the following YouTube video comments and summarize:\n1. Most frequently asked questions  \n2. Common pain points  \n3. What viewers want to see next  \n4. Emotional tone (e.g., frustration, excitement, confusion)  \n5. Topics the audience wants to understand better  \n6. Common misunderstandings that need clarification  \n\nComments:\n${comments.map((c, i) => `${i + 1}. ${c.text}`).join('\\n')}\nPlease respond in bullet points and in English.\n        `.trim();
      }

      const res = await fetch(
        'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=' + geminiKey,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );
      const data = await res.json();
      const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (geminiText) {
        setAnalysis(geminiText);
      } else {
        setError('Gemini analysis failed. Please check your API key or try again later.');
      }
    } catch (err: any) {
      setError('Gemini analysis error: ' + err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const autoFillCurrentTabUrl = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
      setVideoUrl(tab.url);
    }
  };

  const sortedComments = [...comments].sort((a: any, b: any) => {
    switch (sortOption) {
      case 'time':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'time-old':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'like':
        return b.likeCount - a.likeCount;
      case 'like-asc':
        return a.likeCount - b.likeCount;
      default:
        return 0;
    }
  })

  function markdownToHtml(text: string) {
    return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">YouTube Comment Analyzer</h1>
        <p className="subtitle">Understand what the audience really thinks—in just a few clicks.</p>
      </header>

      <div className="url-input-group">
        <div className="input-container">
          <input
            type="text"
            className="url-input"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste YouTube video URL here..."
          />
          <button
            className="analyze-button"
            onClick={fetchComments}
            disabled={loading}
          >
            {loading ? 'Loading comments...' : 'Get Comments'}
          </button>
        </div>
        <button onClick={autoFillCurrentTabUrl} className="autofill-link-button">
            Use current tab's URL
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      
      {loading && <div className="loader">Fetching comments...</div>}

      {sortedComments.length > 0 && (
        <div className="comments-container">
          <div className="sort-container">
            <span style={{ marginRight: 8 }}>
              {sortOption === 'time' && <FontAwesomeIcon icon={faSortAmountDown} title="Time Descending" />}
              {sortOption === 'time-asc' && <FontAwesomeIcon icon={faSortAmountUp} title="Time Ascending" />}
              {sortOption === 'like' && <FontAwesomeIcon icon={faThumbsUp} title="Like Descending" />}
              {sortOption === 'like-asc' && <FontAwesomeIcon icon={faThumbsUp} rotation={180} title="Like Ascending" />}
            </span>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="time">Time (DESC)</option>
              <option value="time-asc">Time (ASC)</option>
              <option value="like">Like (DESC)</option>
              <option value="like-asc">Like (ASC)</option>
            </select>
          </div>
          <hr />
          {sortedComments.map((comment) => (
            <div key={comment.id} className="comment">
              <img src={comment.authorProfileImageUrl} alt={`${comment.author}'s avatar`} className="comment-avatar" />
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">{new Date(comment.publishedAt).toLocaleDateString()}</span>
                </div>
                <p className="comment-text" dangerouslySetInnerHTML={{ __html: comment.text.replace(/\n/g, '<br />') }}></p>
                <div className="comment-actions">
                  <span role="img" aria-label="like" className="like-icon">👍</span>
                  <span>{comment.likeCount > 0 ? comment.likeCount : ''}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {comments.length > 0 && (
        <>
          <div style={{ marginTop: 8, marginLeft: 5, textAlign: 'left' }}>
            <label htmlFor="lang-select" style={{ fontSize: 13, marginRight: 6 }}>AI Response Language: </label>
            <select
              id="lang-select"
              value={answerLang}
              onChange={e => setAnswerLang(e.target.value)}
              style={{ fontSize: 13, padding: '2px 8px', borderRadius: 4 }}
            >
              <option value="zh">中文</option>
              <option value="en">English</option>
            </select>
          </div>
          <button
            className="analyze-button"
            onClick={analyzeCommentsWithGemini}
            disabled={analyzing}
            style={{ margin: '16px 0', borderRadius: '4px' }}
          >
            {analyzing ? 'Analyzing with Gemini...' : 'Analyze with Gemini AI'}
          </button>
          {analysis && (
            <div className="ai-analysis-result" style={{ marginLeft: 5 }}>
              <h3>Gemini AI Analysis</h3>
              <div
                style={{ whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{ __html: markdownToHtml(analysis) }}
              />
            </div>
          )}
        </>
      )}

      <details className="advanced-settings">
        <summary>Advanced Settings</summary>
        <div className="advanced-settings-content">
          <input
            type="password"
            className="api-key-input"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your YouTube Data API v3 Key"
          />
          <input
            type="password"
            className="api-key-input"
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            placeholder="Enter your Gemini API Key"
            style={{ marginTop: 8 }}
          />
        </div>
      </details>
    </div>
  );
}

export default App;