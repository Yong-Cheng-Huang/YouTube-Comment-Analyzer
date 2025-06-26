# YouTube Comment Analyzer
## 🚀 Project Overview
**YouTube Comment Analyzer** is a Chrome extension specifically designed for content creators and market analysts. This project integrates YouTube Data API with Google Gemini AI to quickly fetch, analyze, and summarize comments from any YouTube video. Users no longer need to manually scroll through thousands of comments - with just one click, you can gain deep insights into audience core feedback, emotional reactions, and future expectations.

---

## ✨ Core Features
### 💬 **One-Click Comment Fetching & Browsing**
#### **Automatic URL Detection: Automatically detects the current YouTube video page URL, simplifying the workflow.**

#### **Comment Sorting: Comments are sorted by time (TIME) in descending order by default, allowing quick access to the latest comments.**
#### **Intuitive Interface: Clearly displays commenter, content, and like count for easy browsing.**
<img width="1000" alt="demo-1" src="https://github.com/user-attachments/assets/3716a000-77d8-4eea-bad5-9ec423ffebf1" />

### 🧠 **Gemini AI Intelligent Analysis**
#### **Multi-language Analysis**
- Supports different AI response languages to meet cross-cultural community analysis needs.

#### **Most Frequently Asked Questions (FAQ Compilation)**
- Automatically compiles the most common questions from viewers, helping creators prepare Q&A sessions or provide targeted responses to audience inquiries.

#### **Common Pain Points Analysis**
- Identifies negative emotions hidden in comments, such as sadness, disappointment, dissatisfaction, etc., helping creators optimize content and viewer experience.

#### **Audience Expectations Insights (What Viewers Want to See Next)**
- Extracts audience suggestions and expectations for future video topics from comments, providing inspiration and direction for content creation.

#### **Sentiment Categorization**
- Analyzes the overall emotional atmosphere of comments, such as excitement, emotion, confusion, resonance, etc.

#### **Topics Viewers Want to Learn More About**
- Detects which topics viewers have continued interest in and desire for deeper understanding.

#### **Misunderstanding Clarification Suggestions**
- Identifies common misunderstandings and confusion points among viewers, helping creators provide timely clarification and supplementary explanations.

<img width="1000" alt="demo-2" src="https://github.com/user-attachments/assets/7da57b12-2372-4625-9b24-81c45e4d1494" />
<img width="1000" alt="demo-3" src="https://github.com/user-attachments/assets/88a8a22d-5693-4de0-8dc6-e50fd200b6ff" />

---

## 📝 Usage Workflow
### **1. Initial Setup**
In "Advanced Settings", enter your YouTube Data API Key and Gemini API Key respectively.

### **2. Extract Comments**
- Open any YouTube video page.
- Click the extension icon, and the program will automatically fill in the current page URL.
- Click "Get Comments", and the comment list will be displayed below.

### **3. Launch AI Analysis**
- After confirming comments are loaded, click "Analyze with Gemini AI".
- AI will begin processing the data and generate a structured analysis report below.

---

## 🚀 Installation & Setup
### 1. Get Project Source Code
```bash
git clone https://github.com/Yong-Cheng-Huang/YouTube-Comment-Analyzer/
```

### 2. Load Extension
- Open Google Chrome browser and navigate to chrome://extensions.
- Enable "Developer mode" in the top right corner.
- Click "Load unpacked" in the top left corner.
- Select the project folder `dist` you just cloned to complete the installation.

### 3. Configure API Keys
- Go to Google Cloud Console to obtain YouTube Data API v3 key.
- Go to Google AI Studio to obtain Gemini API key.
- Enter the keys in the extension's settings fields.

---

## 🛠️ Technical Architecture
### **Frontend Technologies**
- React + Vite + TypeScript + HTML5 + CSS3

### **API Integration**
- YouTube Data API v3, Google Gemini API, Chrome Extension API

---

## 🔑 API Requirements
- **YouTube Data API v3**: Required for fetching video comments
- **Google Gemini API**: Required for AI-powered comment analysis

---

## 🎯 Target Users
- **Content Creators**: Understand audience feedback and optimize content strategy
- **Market Analysts**: Analyze user sentiment and market trends
- **Social Media Managers**: Monitor brand mentions and audience reactions
- **Researchers**: Study online community behavior and engagement patterns

---

## 📊 Analysis Categories
The extension provides comprehensive analysis across multiple dimensions:
- **Sentiment Analysis**: Overall emotional tone of comments
- **FAQ Generation**: Most common questions and concerns
- **Pain Point Detection**: Issues and frustrations expressed by viewers
- **Future Content Suggestions**: What viewers want to see next
- **Learning Interests**: Topics viewers want to explore further
- **Misconception Identification**: Common misunderstandings that need clarification

---

## 🌐 Multi-language Support
The extension supports analysis in multiple languages, making it suitable for international content creators and global audience analysis.

---

## 📈 Benefits
- **Time-Saving**: No more manual scrolling through hundreds of comments
- **Actionable Insights**: Get structured, actionable feedback from your audience
- **Content Strategy**: Data-driven approach to content planning
- **Audience Understanding**: Deep insights into viewer preferences and concerns
- **Efficiency**: Quick analysis of large comment datasets

---

## 🔧 Development
This project uses modern web technologies:
- **React**: For building the user interface
- **Vite**: For fast development and building
- **TypeScript**: For type-safe development
- **Chrome Extension APIs**: For browser integration

---

## 📄 License
Please refer to the project repository for licensing information.

---

## 🤝 Contributing
Contributions are welcome! Please check the project repository for contribution guidelines.

---

## 📞 Support
For issues, feature requests, or questions, please visit the project's GitHub repository.
