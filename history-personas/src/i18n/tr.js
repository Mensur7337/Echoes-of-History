export default {
  nav: { explore:"Keşfet", history:"Geçmiş", login:"Giriş Yap", register:"Kayıt Ol" },
  landing: {
    title:"Konuşmak istediğin tarihi kişilik kim?",
    subtitle:"Yapay zeka, tarihin en büyük zihinlerini canlandırıyor. Birini seç ve konuşmaya başla.",
    searchPlaceholder:"Tarihsel figür ara...",
    loginRequired:"Sohbet başlatmak için giriş yapman gerekiyor."
  },
  modal: {
    knowledgeLimit:"Bilgi Sınırı", knowledgeLimitValue:"{{year}} yılına kadar",
    about:"Hakkında", startBtn:"Konuşmayı Başlat", wikipedia:"Wikipedia", wikipediaLabel:"Kaynaklar",
  },
  chat: {
    newChat:"＋ Yeni Sohbet", changePersona:"👥 Persona Değiştir", settings:"⚙️ Ayarlar",
    send:"Gönder", inputPlaceholder:"{{name}}'e mesaj yaz...",
    greeting:"Merhaba! Ben {{name}}. Hayatım, çalışmalarım veya dünyaya bakışım hakkında her şeyi sorabilirsin.",
    ttsOn:"Sesli okuma açık", ttsOff:"Sesli okuma kapalı",
    micOn:"Mikrofon aktif — konuş...", micOff:"Sesle yaz",
    newChatTitle:"Yeni Sohbet",
    newChatMessage:"Mevcut sohbet geçmişte saklanacak ve yeni bir sohbet açılacak. Devam edilsin mi?",
    noApiKey:"Lütfen Ayarlar sayfasından Gemini API anahtarınızı girin.",
    apiError:"Bağlantı hatası. API anahtarınızı ve internet bağlantınızı kontrol edin.",
    apiInvalid:"API anahtarı geçersiz veya kotanız dolmuş.",
    knowledgeCapLabel:"📚 {{year}} yılına kadar",
    writting:"Yazıyor"
  },
  history: {
    title:"Konuşma Geçmişi", subtitle:"Tarihte yaptığın tüm bilgece konuşmalar burada.",
    empty:"Henüz bir konuşma başlatmadın.", session:"Oturum {{n}}"
  },
  settings: {
    title:"Ayarlar", appearance:"Görünüm", dark:"🌙 Koyu", light:"☀️ Açık", auto:"🖥️ Otomatik",
    language:"Dil", profile:"Profil Bilgileri", changePhoto:"Fotoğraf Değiştir",
    firstName:"Ad", lastName:"Soyad", email:"E-posta", saveProfile:"Profili Güncelle",
    profileSaved:"Profil güncellendi!", ai:"AI Yapılandırması",
    apiKeyLabel:"Gemini API Anahtarı", apiKeyPlaceholder:"API anahtarınızı buraya girin...",
    apiKeyHelper:"Anahtarın yalnızca bu cihazda saklanır. Hiçbir sunucuya gönderilmez.",
    apiKeySave:"Kaydet", apiKeySaved:"API anahtarı kaydedildi!",
    apiKeyTest:"Bağlantıyı Test Et", apiKeyTestOk:"✅ Bağlantı başarılı!",
    apiKeyTestFail:"❌ Başarısız: {{msg}}",
    session:"Oturum", logoutDesc:"Çıkış yaptığında giriş sayfasına yönlendirileceksin.",
    logout:"Çıkış Yap", logoutConfirm:"Oturumunu kapatmak istediğine emin misin?",
    danger:"Tehlikeli Bölge", dangerDesc:"Hesabın kalıcı olarak silinecek.",
    deleteAccount:"Hesabı Sil", deleteTitle:"Hesabı Sil",
    deleteDesc:"Onaylamak için e-posta ve şifreni gir.",
    deleteConfirmBtn:"Evet, sil", deleteCancel:"İptal", deleteError:"Bilgiler eşleşmiyor!"
  },
  auth: {
    loginTab:"Giriş Yap", registerTab:"Kayıt Ol", firstName:"Ad", lastName:"Soyad",
    email:"E-posta", password:"Şifre", profilePic:"Profil Fotoğrafı (opsiyonel)",
    loginBtn:"Giriş Yap", registerBtn:"Hesap Oluştur",
    invalidEmail:"Geçersiz e-posta adresi.", loginError:"E-posta veya şifre hatalı.",
    registerSuccess:"Kayıt başarılı! Şimdi giriş yapabilirsin.",
    registerError:"Bu e-posta zaten kayıtlı."
  },
  confirm: { yes:"Evet", no:"Hayır" },
  notFound: { title:"Bu zaman dilimi henüz keşfedilmedi.", button:"Ana Sayfaya Dön" }
};
