# YouTube Comment Analyzer

## 🚀 專案簡介
《YouTube Comment Analyzer》，這是一個專為內容創作者與市場分析師設計的 Chrome 擴充功能。  
本專案整合了 YouTube Data API 與 Google Gemini AI，旨在快速抓取、分析並總結任何 YouTube 影片下方的留言。  
使用者無需再手動滾動瀏覽成千上萬的評論，只需一鍵點擊，即可深入了解觀眾的核心回饋、情緒反應與未來期待。

---

## ✨ 核心功能

### 💬 **一鍵抓取與瀏覽留言**

#### **自動代入網址：自動偵測當前 YouTube 影片頁面網址，簡化操作流程。** 
  
#### **留言排序：預設依照留言時間 (TIME) 降序排列，快速查看最新發布的評論。**

#### **直觀介面：清晰展示留言者、內容與按讚數，方便快速瀏覽。**

<img width="1000" alt="demo-1" src="https://github.com/user-attachments/assets/3716a000-77d8-4eea-bad5-9ec423ffebf1" />

### **Gemini AI 智慧分析**

#### **多語言分析**
- 支援選擇不同的 AI 回應語言，滿足跨國社群分析需求。


#### **常見問題彙整（Most Frequently Asked Questions）**
- 自動彙整觀眾最常提出的問題，幫助創作者準備 Q&A 或精準回應觀眾疑問。


#### **共同痛點分析（Common Pain Points）**
- 辨識留言中隱含的負面情緒，例如悲傷、失望、不滿等，幫助創作者優化內容與觀眾體驗。


#### **觀眾期待洞察 （What Viewers Want to See Next）**
- 從評論中挖掘觀眾對後續影片主題的建議與期待，為內容創作提供靈感與方向。

#### **情緒傾向分類（Sentiment Categorization）**
- 分析留言整體情緒氛圍，如興奮、感動、疑惑、共鳴等。

#### **觀眾想進一步了解的主題（What Viewers Want to Learn More About）**
- 探測觀眾對哪些主題有持續關注與深入了解的意願。


#### **誤解澄清建議（Misunderstanding Clarification）**
- 偵測觀眾常見誤解與混淆之處，協助創作者適時釋疑與補充說明。

<img width="1000" alt="demo-2" src="https://github.com/user-attachments/assets/7da57b12-2372-4625-9b24-81c45e4d1494" />

<img width="1000" alt="demo-3" src="https://github.com/user-attachments/assets/88a8a22d-5693-4de0-8dc6-e50fd200b6ff" />

---

## 📝 使用流程

### **1. 初始設定**
在「Advanced Settings」中，分別輸入您的 YouTube Data API Key 與 Gemini API Key。

### **2. 提取評論**
- 開啟任一 YouTube 影片頁面。
- 點擊擴充功能圖示，程式會自動填入當前頁面 URL。
- 點擊「Get Comments」，下方即會顯示留言列表。

### **3. 啟動 AI 分析**
- 確認留言載入後，點擊「Analyze with Gemini AI」。
- AI 將開始處理數據，並在下方生成結構化的分析報告。

---

## 🚀 安裝與執行

### 1. 取得專案原始碼

```bash
git clone https://github.com/Yong-Cheng-Huang/YouTube-Comment-Analyzer/
```

### 2. 載入擴充功能
- 開啟 Google Chrome 瀏覽器，前往 chrome://extensions。
- 啟用右上角的「開發人員模式 (Developer mode)」。
- 點擊左上角的「載入未封裝項目 (Load unpacked)」。
- 選擇您剛剛複製下來的專案資料夾dist，即可完成安裝。

### 3. 設定 API 金鑰
- 前往 Google Cloud Console 取得 YouTube Data API v3 金鑰。
- 前往 Google AI Studio 取得 Gemini API 金鑰。
- 將金鑰填入本擴充功能的設定欄位中。

---

## 🛠️ 技術架構

### **前端技術**
- React + Vite + TypeScript + HTML5 + CSS3
### **API 整合**
- YouTube Data API v3、Google Gemini API、Chrome Extension API

