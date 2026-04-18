[History-Personas-Ekran-Görüntüleri.pdf](https://github.com/user-attachments/files/26858058/History-Personas-Ekran-Goruntuleri.pdf)

# ⌛ Echoes of History

> Tarihin en büyük zihinleriyle konuş. AI destekli tarihsel persona sohbet uygulaması.

![Static Badge](https://img.shields.io/badge/HTML%20%2B%20CSS%20%2B%20JS-Vanilla-gold)
![Static Badge](https://img.shields.io/badge/AI-Gemini%202.0%20Flash-blue)
![Static Badge](https://img.shields.io/badge/Dil-TR%20%2F%20EN-green)

---

## 📖 Proje Hakkında

**Echoes of History**, herhangi bir framework veya kütüphane kullanmadan saf HTML, CSS ve JavaScript ile yazılmış bir Single-Page Application'dır (SPA). Kullanıcılar Einstein, Marie Curie, Leonardo da Vinci ve 17 farklı tarihi figürle Google Gemini API üzerinden yapay zeka destekli sohbet edebilir.

---

## ✨ Özellikler

| Özellik | Açıklama |
|---|---|
| 🧠 20 Tarihi Karakter | Farklı dönem ve disiplinlerden seçilmiş figürler |
| 💬 Çok Turlu Sohbet | AI önceki mesajları hatırlar |
| 🎙️ Sesle Yazma | Mikrofon ile konuşarak mesaj gönder |
| 🔊 Sesli Okuma (TTS) | AI yanıtlarını sesli dinle |
| 🌍 Türkçe / İngilizce | Sözlük tabanlı i18n sistemi |
| 🌙 Dark / Light / Auto | CSS değişkenleri ile anlık tema geçişi |
| 📚 Sohbet Geçmişi | Her persona için çok oturumlu arşiv |
| 👤 Kullanıcı Sistemi | Kayıt, giriş, profil fotoğrafı güncelleme |

---


## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Herhangi bir modern tarayıcı (Chrome, Edge, Safari)
- **VS Code** + **Live Server** eklentisi  
  *(veya herhangi bir HTTP sunucusu — Python, Node, Nginx)*

> ⚠️ **Önemli:** `index.html` dosyasını doğrudan çift tıklayarak **açamazsın**.  
> `type="module"` kullanan ES modülleri `file://` protokolünde çalışmaz.  
> Mutlaka bir HTTP sunucusu üzerinden açılmalıdır.

---

### Adım 1 — Repoyu klonla

```bash
git clone https://github.com/KULLANICI_ADIN/echoes-of-history.git
cd echoes-of-history
```

### Adım 2 — Projeyi aç

**VS Code ile:**
1. VS Code'u aç
2. `File > Open Folder` → proje klasörünü seç
3. Sağ alttaki **Go Live** butonuna tıkla
4. Tarayıcıda `http://localhost:5500` açılır



### Adım 3 — Gemini API Anahtarı Al

1. [Google AI Studio](https://aistudio.google.com) adresine git
2. **"Get API Key" → "Create API key"** ile ücretsiz anahtar oluştur
3. Uygulamada **Ayarlar → AI Yapılandırması** bölümüne gir
4. Anahtarını yapıştır → **"Bağlantıyı Test Et"** → **"Kaydet"**

> 🔒 Anahtarın yalnızca kendi tarayıcında `localStorage`'da saklanır.  
> Hiçbir sunucuya gönderilmez, bu repoya eklenmez.

---

## 🔑 API Anahtarı Güvenliği

Bu proje **tamamen istemci taraflı (client-side)** çalışır — hiçbir backend/sunucu kodu yoktur.

| Durum | Açıklama |
|---|---|
| ✅ Güvenli | API key **kaynak kodda yok** — repoya yüklemiyorsun |
| ✅ Güvenli | Key yalnızca senin tarayıcında `localStorage`'da saklanır |
| ✅ Güvenli | `.gitignore`'da `.env` girişi mevcut (ileride gerekirse) |
| ⚠️ Dikkat | `localStorage`'daki key tarayıcı geliştirici araçlarından görülebilir |
| ⚠️ Dikkat | Uygulamayı başkasının bilgisayarında açık bırakma |

**Sonuç:** Bu proje yapısında `.env` dosyasına gerek yoktur. API key kaynak kodunda hiçbir yerde bulunmadığı için GitHub'a göndermek tamamen güvenlidir.

---

## 📁 Proje Yapısı

```
echoes-of-history/
│
├── index.html                  # Tek HTML dosyası
├── 404.html                    # 404 sayfası
├── .gitignore
│
├── src/
│   ├── app.js                  # Giriş noktası — tema, navbar, router
│   │
│   ├── core/
│   │   ├── Component.js        # Tüm sayfaların taban sınıfı
│   │   └── Router.js           # State tabanlı SPA router
│   │
│   ├── pages/
│   │   ├── Landing.js          # Ana sayfa — karakter seçimi
│   │   ├── Auth.js             # Giriş / kayıt
│   │   ├── Chat.js             # Sohbet ekranı
│   │   ├── ChatHistory.js      # Geçmiş oturumlar
│   │   └── Settings.js         # Tema, profil, API, çıkış
│   │
│   ├── components/
│   │   ├── Navbar.js           # Üst gezinme çubuğu
│   │   └── PersonaPreview.js   # Karakter önizleme modalı
│   │
│   ├── services/
│   │   ├── AuthService.js      # Kullanıcı kayıt/giriş/güncelleme
│   │   ├── Gemini.js           # Google Gemini API entegrasyonu
│   │   ├── Storage.js          # Çok oturumlu sohbet geçmişi
│   │   ├── TTS.js              # Sesli okuma (SpeechSynthesis)
│   │   └── SpeechRecognition.js # Sesle yazma (mikrofon)
│   │
│   ├── data/
│   │   └── personas.js         # 20 tarihi karakter verisi
│   │
│   ├── i18n/
│   │   ├── tr.js               # Türkçe sözlük
│   │   ├── en.js               # İngilizce sözlük
│   │   └── index.js            # t() çeviri fonksiyonu
│   │
│   └── utils/
│       └── confirm.js          # showConfirm() + showToast()
│
└── styles/
    ├── variables.css           # Tema renk değişkenleri
    ├── app.css                 # Global stiller
    └── components/
        ├── landing.css
        ├── chat.css
        ├── auth.css
        ├── settings.css
        ├── history.css
        └── modal.css
```

---

## 🏗️ Teknik Mimari

### Router (URL Değişmez)

Bu uygulama sunucusuz çalıştığından URL hiçbir zaman değişmez. URL Her değiştiğinde 404 sayfasına atar.Tüm sayfa geçişleri JavaScript state'i üzerinden yapılır:

```js
// url den herhangi bir Sayfa geçişine izin vermez. 
const rawPath = window.location.pathname
            .replace(/\/index\.html$/, '')  
            .replace(/\/$/, '') || '/';     

        if (rawPath !== '' && rawPath !== '/') {
            this.router.init('/404');
            return;
        }

        const user = AuthService.getCurrentUser();
        this.router.init(user ? '/' : '/auth');
    }
```

### Component Sistemi

```
Component (taban sınıf)
  ├── constructor(parentElement)
  ├── render()       ← her sayfa kendi HTML'ini yazar
  └── afterRender()  ← isteğe bağlı
        ↓ extends
  Landing / Auth / Chat / Settings / ChatHistory
```

### Sohbet Geçmişi Veri Yapısı

```json
{
  "einstein": {
    "sessions": [
      {
        "id": "sess_1712345678",
        "startedAt": "2026-10-04T10:00:00Z",
        "messages": [
          { "sender": "ai",   "text": "Merhaba!" },
          { "sender": "user", "text": "Görecelik kanunu nedir?" }
        ]
      }
    ]
  }
}
```

---

## 🌍 Dil Desteği

Sözlükler `src/i18n/tr.js` ve `src/i18n/en.js` dosyalarındadır.

```js
// Basit kullanım
t('chat.send')                          // → "Gönder"

// Değişken interpolasyon
t('chat.greeting', { name: 'Einstein' }) // → "Merhaba! Ben Einstein."
```

Yeni dil eklemek için `src/i18n/` altına yeni bir `.js` dosyası oluştur ve `index.js`'e import et.

---
  Tarihin en büyük zihinleriyle konuş &nbsp;⌛
</p>
