const rawTranslations = {
  en: {
    languageName: "English",

    auth: {
      signIn: "Sign in",
      signUp: "Create account",
      signOut: "Sign out",
      profile: "Profile",
      account: "Account",
      planFree: "Free plan",
      planPremium: "Premium plan",

      pleaseWait: "Please wait...",
      showPassword: "Show",
      hidePassword: "Hide",

      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      currentPassword: "Current password",
      newPassword: "New password",
      passwordHint: "At least 8 characters, including a letter and a number.",

      loginTitle: "Welcome back",
      loginSubtitle: "Sign in to your ToolsGift account.",
      loginCta: "Sign in",
      forgotPassword: "Forgot your password?",
      noAccount: "Don't have an account?",
      createAccountCta: "Create one",

      signupTitle: "Create your account",
      signupSubtitle: "Create a free account to manage your profile and settings.",
      signupCta: "Create account",
      haveAccount: "Already have an account?",
      signInCta: "Sign in",

      forgotTitle: "Reset your password",
      forgotSubtitle: "Enter your email address and we will send you a secure reset link.",
      sendResetLink: "Send reset link",
      sentTitle: "Check your inbox",
      sentSubtitle: "If an account exists for that address, a password reset link is on its way. The link expires in 15 minutes.",
      backToLogin: "Back to sign in",

      resetTitle: "Choose a new password",
      resetSubtitle: "Enter a new password for your account.",
      resetCta: "Update password",
      updatedTitle: "Password updated",
      updatedSubtitle: "Your password has been changed. Every other session was signed out.",
      goToSignIn: "Continue to sign in",
      invalidLinkTitle: "This link is no longer valid",
      invalidLinkSubtitle: "Reset links expire after 15 minutes. Request a new one and try again.",

      memberSince: "Member since",
      personalInfo: "Personal information",
      personalInfoDesc: "Your name is shown across your ToolsGift account.",
      security: "Security",
      securityDesc: "Change your password. Changing it signs you out everywhere else.",
      saveChanges: "Save changes",
      changesSaved: "Changes saved",
      changePasswordCta: "Change password",
      passwordChanged: "Password changed",
      sessions: "Sessions",
      sessionsDesc: "You are signed in on this device. Signing out everywhere ends every session, including this one.",
      signOutEverywhere: "Sign out everywhere",

      continueWithGoogle: "Continue with Google",
      googleDivider: "or",
      errGoogleCancelled: "Google sign-in was cancelled. Please try again.",
      errGoogleFailed: "Something went wrong signing in with Google. Please try again.",
      errGoogleEmailTaken: "That Google account isn't linked to your ToolsGift account yet. Sign in with your password first, then link it from your profile.",
      errGoogleNotConfigured: "Google sign-in is not available right now. Please try again later.",
      connectedAccounts: "Connected accounts",
      connectedAccountsDesc: "Link your Google account so you can sign in with Google next time.",
      googleLinked: "Connected",
      linkGoogle: "Link Google account",
      errRequired: "This field is required.",
      errInvalidEmail: "Enter a valid email address.",
      errName: "Name must be between 2 and 80 characters.",
      errWeakPassword: "Use at least 8 characters with a letter and a number.",
      errPasswordMismatch: "Passwords do not match.",
      errEmailTaken: "An account already exists with this email address.",
      errInvalidCredentials: "Incorrect email or password.",
      errWrongPassword: "Your current password is incorrect.",
      errRateLimited: "Too many attempts. Wait a few minutes and try again.",
      errInvalidToken: "This reset link is invalid or has expired.",
      errNotAuthenticated: "Please sign in to continue.",
      errNetwork: "Could not reach the server. Check your connection and try again.",
      errServer: "Something went wrong. Please try again.",
    },

    nav: {
      home: "Home",
      allTools: "All Tools",
      images: "Images",
      pdf: "PDF",
      convert: "Convert",
      search: "Search",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      more: "More",

      language: "Language",
      menu: "Menu",
      tools: "Tools",
      features: "Features",
      howItWorks: "How it works",
      faq: "FAQ",
      getStarted: "Get Started",    },

    common: {
      upload: "Upload",
      download: "Download",
      process: "Process",
      convert: "Convert",
      compress: "Compress",
      resize: "Resize",
      edit: "Edit",
      remove: "Remove",
      clear: "Clear",
      reset: "Reset",
      save: "Save",
      cancel: "Cancel",
      copy: "Copy",
      copied: "Copied",
      open: "Open",
      close: "Close",
      back: "Back",
      next: "Next",
      previous: "Previous",
      selectFile: "Select File",
      selectFiles: "Select Files",
      chooseFile: "Choose File",
      chooseFiles: "Choose Files",
      dragDrop: "Drag & drop your file here",
      or: "or",
      browse: "Browse",
      loading: "Loading...",
      processing: "Processing...",
      completed: "Completed",
      error: "Something went wrong",
      tryAgain: "Try Again",
      removeFile: "Remove File",
      downloadFile: "Download File",
      downloadFiles: "Download Files",
      searchTools: "Search tools...",
      noResults: "No results found",
    },

    home: {
      heroTitle: "Everything you need to work with your files.",
      heroDescription:
        "Convert, compress, resize, edit and manage images, PDFs and everyday files with simple online tools.",
      searchPlaceholder:
        "Search tools, PDF, image, compress, convert...",
      toolsLabel: "Tools",
      toolsTitle: "Find the tool you need.",
      toolsDescription:
        "Browse the collection or search by what you want to do.",
      tool: "tool",
      tools: "tools",
      openTool: "Open tool",
      noToolsFound: "No tools found",
      noToolsDescription:
        "Try a different search term or choose another category.",
      clearSearch: "Clear search",
      all: "All",
      images: "Images",
      pdf: "PDF",
      convert: "Convert",
      compress: "Compress",
      productLabel: "ToolsGift",
      productTitle:
        "Useful tools without the unnecessary complexity.",
      productDescription:
        "ToolsGift brings everyday file, document and utility tools together in one clean place, so you can get the task done without jumping between different websites.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "Image Tools",
      organizePdf: "Organize PDF",
      optimizePdf: "Optimize PDF",
      convertToPdf: "Convert to PDF",
      convertFromPdf: "Convert from PDF",
      editPdf: "Edit PDF",
      pdfSecurity: "PDF Security",
      pdfIntelligence: "PDF Intelligence",
      utilityOther: "Utility & Other",
    },

    footer: {
      about: "About",
      contact: "Contact",
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
      disclaimer: "Disclaimer",
      copyright: "© ToolsGift. All rights reserved.",
    },

    messages: {
      fileTooLarge: "File is too large.",
      invalidFile: "Invalid file.",
      unsupportedFormat: "Unsupported file format.",
      uploadFailed: "Upload failed.",
      processingFailed: "Processing failed.",
      somethingWentWrong: "Something went wrong. Please try again.",
      noFileSelected: "Please select a file first.",
      multipleFilesRequired: "Please select multiple files.",
    },
  },

  hi: {
    languageName: "हिन्दी",

    auth: {
      signIn: "साइन इन करें",
      signUp: "खाता बनाएं",
      signOut: "साइन आउट करें",
      profile: "प्रोफ़ाइल",
      account: "खाता",
      planFree: "मुफ़्त प्लान",
      planPremium: "प्रीमियम प्लान",

      pleaseWait: "कृपया प्रतीक्षा करें...",
      showPassword: "दिखाएं",
      hidePassword: "छिपाएं",

      name: "नाम",
      namePlaceholder: "आपका नाम",
      email: "ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      currentPassword: "वर्तमान पासवर्ड",
      newPassword: "नया पासवर्ड",
      passwordHint: "कम से कम 8 अक्षर, जिसमें एक अक्षर और एक अंक हो।",

      loginTitle: "वापसी पर स्वागत है",
      loginSubtitle: "अपने ToolsGift खाते में साइन इन करें।",
      loginCta: "साइन इन करें",
      forgotPassword: "पासवर्ड भूल गए?",
      noAccount: "खाता नहीं है?",
      createAccountCta: "एक बनाएं",

      signupTitle: "अपना खाता बनाएं",
      signupSubtitle: "प्रोफ़ाइल और सेटिंग्स प्रबंधित करने के लिए एक मुफ़्त खाता बनाएं।",
      signupCta: "खाता बनाएं",
      haveAccount: "पहले से खाता है?",
      signInCta: "साइन इन करें",

      forgotTitle: "पासवर्ड रीसेट करें",
      forgotSubtitle: "अपना ईमेल पता दर्ज करें, हम आपको एक सुरक्षित रीसेट लिंक भेजेंगे।",
      sendResetLink: "रीसेट लिंक भेजें",
      sentTitle: "अपना इनबॉक्स जांचें",
      sentSubtitle: "यदि इस पते का खाता मौजूद है, तो पासवर्ड रीसेट लिंक भेज दिया गया है। लिंक 15 मिनट में समाप्त होता है।",
      backToLogin: "साइन इन पर वापस जाएं",

      resetTitle: "नया पासवर्ड चुनें",
      resetSubtitle: "अपने खाते के लिए नया पासवर्ड दर्ज करें।",
      resetCta: "पासवर्ड अपडेट करें",
      updatedTitle: "पासवर्ड अपडेट हो गया",
      updatedSubtitle: "आपका पासवर्ड बदल दिया गया है। बाकी सभी सत्र साइन आउट कर दिए गए हैं।",
      goToSignIn: "साइन इन जारी रखें",
      invalidLinkTitle: "यह लिंक अब मान्य नहीं है",
      invalidLinkSubtitle: "रीसेट लिंक 15 मिनट बाद समाप्त हो जाते हैं। नया लिंक मांगें और फिर से प्रयास करें।",

      memberSince: "सदस्यता तिथि",
      personalInfo: "व्यक्तिगत जानकारी",
      personalInfoDesc: "आपका नाम आपके ToolsGift खाते में दिखाई देता है।",
      security: "सुरक्षा",
      securityDesc: "अपना पासवर्ड बदलें। बदलने पर आप हर जगह से साइन आउट हो जाएंगे।",
      saveChanges: "परिवर्तन सहेजें",
      changesSaved: "परिवर्तन सहेजे गए",
      changePasswordCta: "पासवर्ड बदलें",
      passwordChanged: "पासवर्ड बदल दिया गया",
      sessions: "सत्र",
      sessionsDesc: "आप इस डिवाइस पर साइन इन हैं। हर जगह से साइन आउट करने पर यह सत्र भी समाप्त हो जाएगा।",
      signOutEverywhere: "हर जगह से साइन आउट करें",

      continueWithGoogle: "Google से जारी रखें",
      googleDivider: "या",
      errGoogleCancelled: "Google साइन-इन रद्द कर दिया गया। कृपया पुनः प्रयास करें।",
      errGoogleFailed: "Google से साइन इन करते समय कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
      errGoogleEmailTaken: "यह Google खाता अभी आपके ToolsGift खाते से लिंक नहीं है। पहले अपने पासवर्ड से साइन इन करें, फिर प्रोफ़ाइल से इसे लिंक करें।",
      errGoogleNotConfigured: "अभी Google साइन-इन उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।",
      connectedAccounts: "लिंक किए गए खाते",
      connectedAccountsDesc: "अगली बार Google से साइन इन करने के लिए अपना Google खाता लिंक करें।",
      googleLinked: "लिंक्ड",
      linkGoogle: "Google खाता लिंक करें",
      errRequired: "यह फ़ील्ड आवश्यक है।",
      errInvalidEmail: "एक वैध ईमेल पता दर्ज करें।",
      errName: "नाम 2 से 80 अक्षरों के बीच होना चाहिए।",
      errWeakPassword: "कम से कम 8 अक्षरों का उपयोग करें, जिसमें एक अक्षर और एक अंक हो।",
      errPasswordMismatch: "पासवर्ड मेल नहीं खाते।",
      errEmailTaken: "इस ईमेल पते से पहले से एक खाता मौजूद है।",
      errInvalidCredentials: "ईमेल या पासवर्ड गलत है।",
      errWrongPassword: "आपका वर्तमान पासवर्ड गलत है।",
      errRateLimited: "बहुत अधिक प्रयास। कुछ मिनट प्रतीक्षा करें और फिर से प्रयास करें।",
      errInvalidToken: "यह रीसेट लिंक अमान्य है या समाप्त हो गया है।",
      errNotAuthenticated: "जारी रखने के लिए कृपया साइन इन करें।",
      errNetwork: "सर्वर तक नहीं पहुंच सका। अपना कनेक्शन जांचें और फिर से प्रयास करें।",
      errServer: "कुछ गलत हो गया। कृपया फिर से प्रयास करें।",
    },

    nav: {
      home: "होम",
      allTools: "सभी टूल्स",
      images: "इमेज",
      pdf: "PDF",
      convert: "कन्वर्ट",
      search: "सर्च",
      darkMode: "डार्क मोड",
      lightMode: "लाइट मोड",
      more: "और",

      language: "भाषा",
      menu: "मेन्यू",
      tools: "टूल्स",
      features: "फीचर्स",
      howItWorks: "यह कैसे काम करता है",
      faq: "अक्सर पूछे जाने वाले सवाल",
      getStarted: "शुरू करें",    },

    common: {
      upload: "अपलोड करें",
      download: "डाउनलोड करें",
      process: "प्रोसेस करें",
      convert: "कन्वर्ट करें",
      compress: "कम्प्रेस करें",
      resize: "साइज़ बदलें",
      edit: "एडिट करें",
      remove: "हटाएँ",
      clear: "क्लियर करें",
      reset: "रीसेट करें",
      save: "सेव करें",
      cancel: "रद्द करें",
      copy: "कॉपी करें",
      copied: "कॉपी हो गया",
      open: "खोलें",
      close: "बंद करें",
      back: "पीछे",
      next: "आगे",
      previous: "पिछला",
      selectFile: "फ़ाइल चुनें",
      selectFiles: "फ़ाइलें चुनें",
      chooseFile: "फ़ाइल चुनें",
      chooseFiles: "फ़ाइलें चुनें",
      dragDrop: "अपनी फ़ाइल यहाँ ड्रैग और ड्रॉप करें",
      or: "या",
      browse: "ब्राउज़ करें",
      loading: "लोड हो रहा है...",
      processing: "प्रोसेस हो रहा है...",
      completed: "पूरा हो गया",
      error: "कुछ गलत हो गया",
      tryAgain: "फिर से कोशिश करें",
      removeFile: "फ़ाइल हटाएँ",
      downloadFile: "फ़ाइल डाउनलोड करें",
      downloadFiles: "फ़ाइलें डाउनलोड करें",
      searchTools: "टूल्स खोजें...",
      noResults: "कोई परिणाम नहीं मिला",
    },

    home: {
      heroTitle: "अपनी फ़ाइलों के साथ काम करने के लिए आपकी ज़रूरत की हर चीज़।",
      heroDescription:
        "इमेज, PDF और रोज़मर्रा की फ़ाइलों को आसानी से कन्वर्ट, कम्प्रेस, रिसाइज़, एडिट और मैनेज करें।",
      searchPlaceholder:
        "टूल, PDF, इमेज, कम्प्रेस, कन्वर्ट खोजें...",
      toolsLabel: "टूल्स",
      toolsTitle: "अपनी ज़रूरत का टूल खोजें।",
      toolsDescription:
        "टूल्स ब्राउज़ करें या अपने काम के हिसाब से खोजें।",
      tool: "टूल",
      tools: "टूल्स",
      openTool: "टूल खोलें",
      noToolsFound: "कोई टूल नहीं मिला",
      noToolsDescription:
        "कोई दूसरा सर्च शब्द इस्तेमाल करें या दूसरी कैटेगरी चुनें।",
      clearSearch: "सर्च क्लियर करें",
      all: "सभी",
      images: "इमेज",
      pdf: "PDF",
      convert: "कन्वर्ट",
      compress: "कम्प्रेस",
      productLabel: "ToolsGift",
      productTitle:
        "बिना अनावश्यक जटिलता के उपयोगी टूल्स।",
      productDescription:
        "ToolsGift रोज़मर्रा की फ़ाइल, डॉक्यूमेंट और यूटिलिटी टूल्स को एक साफ़ और आसान जगह पर लाता है, ताकि आपको अलग-अलग वेबसाइटों पर जाने की ज़रूरत न पड़े।",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "इमेज टूल्स",
      organizePdf: "PDF व्यवस्थित करें",
      optimizePdf: "PDF ऑप्टिमाइज़ करें",
      convertToPdf: "PDF में कन्वर्ट करें",
      convertFromPdf: "PDF से कन्वर्ट करें",
      editPdf: "PDF एडिट करें",
      pdfSecurity: "PDF सुरक्षा",
      pdfIntelligence: "PDF इंटेलिजेंस",
      utilityOther: "यूटिलिटी और अन्य",
    },

    footer: {
      about: "हमारे बारे में",
      contact: "संपर्क",
      privacy: "प्राइवेसी",
      terms: "शर्तें",
      cookies: "कुकीज़",
      disclaimer: "डिस्क्लेमर",
      copyright: "© ToolsGift. सर्वाधिकार सुरक्षित।",
    },

    messages: {
      fileTooLarge: "फ़ाइल बहुत बड़ी है।",
      invalidFile: "अमान्य फ़ाइल।",
      unsupportedFormat: "यह फ़ाइल फ़ॉर्मेट समर्थित नहीं है।",
      uploadFailed: "अपलोड विफल हुआ।",
      processingFailed: "प्रोसेसिंग विफल हुई।",
      somethingWentWrong: "कुछ गलत हो गया। कृपया फिर से कोशिश करें।",
      noFileSelected: "कृपया पहले एक फ़ाइल चुनें।",
      multipleFilesRequired: "कृपया एक से अधिक फ़ाइलें चुनें।",
    },
  },

  es: {
    languageName: "Español",

    auth: {
      signIn: "Iniciar sesión",
      signUp: "Crear cuenta",
      signOut: "Cerrar sesión",
      profile: "Perfil",
      account: "Cuenta",
      planFree: "Plan gratuito",
      planPremium: "Plan premium",

      pleaseWait: "Espera un momento...",
      showPassword: "Mostrar",
      hidePassword: "Ocultar",

      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Correo electrónico",
      password: "Contraseña",
      confirmPassword: "Confirmar contraseña",
      currentPassword: "Contraseña actual",
      newPassword: "Nueva contraseña",
      passwordHint: "Al menos 8 caracteres, con una letra y un número.",

      loginTitle: "Bienvenido de nuevo",
      loginSubtitle: "Inicia sesión en tu cuenta de ToolsGift.",
      loginCta: "Iniciar sesión",
      forgotPassword: "¿Olvidaste tu contraseña?",
      noAccount: "¿No tienes una cuenta?",
      createAccountCta: "Crea una",

      signupTitle: "Crea tu cuenta",
      signupSubtitle: "Crea una cuenta gratuita para gestionar tu perfil y tus ajustes.",
      signupCta: "Crear cuenta",
      haveAccount: "¿Ya tienes una cuenta?",
      signInCta: "Iniciar sesión",

      forgotTitle: "Restablecer tu contraseña",
      forgotSubtitle: "Escribe tu correo electrónico y te enviaremos un enlace seguro para restablecerla.",
      sendResetLink: "Enviar enlace",
      sentTitle: "Revisa tu bandeja de entrada",
      sentSubtitle: "Si existe una cuenta con ese correo, el enlace ya va en camino. Caduca en 15 minutos.",
      backToLogin: "Volver a iniciar sesión",

      resetTitle: "Elige una contraseña nueva",
      resetSubtitle: "Escribe una contraseña nueva para tu cuenta.",
      resetCta: "Actualizar contraseña",
      updatedTitle: "Contraseña actualizada",
      updatedSubtitle: "Tu contraseña se ha cambiado. El resto de sesiones se cerró.",
      goToSignIn: "Continuar al inicio de sesión",
      invalidLinkTitle: "Este enlace ya no es válido",
      invalidLinkSubtitle: "Los enlaces caducan a los 15 minutos. Solicita uno nuevo e inténtalo de nuevo.",

      memberSince: "Miembro desde",
      personalInfo: "Información personal",
      personalInfoDesc: "Tu nombre se muestra en toda tu cuenta de ToolsGift.",
      security: "Seguridad",
      securityDesc: "Cambia tu contraseña. Al hacerlo, se cierra la sesión en todos los demás dispositivos.",
      saveChanges: "Guardar cambios",
      changesSaved: "Cambios guardados",
      changePasswordCta: "Cambiar contraseña",
      passwordChanged: "Contraseña cambiada",
      sessions: "Sesiones",
      sessionsDesc: "Tienes sesión iniciada en este dispositivo. Cerrar la sesión en todas partes termina todas las sesiones, incluida esta.",
      signOutEverywhere: "Cerrar sesión en todas partes",

      continueWithGoogle: "Continuar con Google",
      googleDivider: "o",
      errGoogleCancelled: "Se canceló el inicio de sesión con Google. Inténtalo de nuevo.",
      errGoogleFailed: "Algo salió mal al iniciar sesión con Google. Inténtalo de nuevo.",
      errGoogleEmailTaken: "Esa cuenta de Google aún no está vinculada a tu cuenta de ToolsGift. Inicia sesión con tu contraseña y luego vincúlala desde tu perfil.",
      errGoogleNotConfigured: "El inicio de sesión con Google no está disponible en este momento. Inténtalo más tarde.",
      connectedAccounts: "Cuentas vinculadas",
      connectedAccountsDesc: "Vincula tu cuenta de Google para iniciar sesión con Google la próxima vez.",
      googleLinked: "Vinculada",
      linkGoogle: "Vincular cuenta de Google",
      errRequired: "Este campo es obligatorio.",
      errInvalidEmail: "Introduce un correo electrónico válido.",
      errName: "El nombre debe tener entre 2 y 80 caracteres.",
      errWeakPassword: "Usa al menos 8 caracteres con una letra y un número.",
      errPasswordMismatch: "Las contraseñas no coinciden.",
      errEmailTaken: "Ya existe una cuenta con este correo electrónico.",
      errInvalidCredentials: "Correo o contraseña incorrectos.",
      errWrongPassword: "Tu contraseña actual es incorrecta.",
      errRateLimited: "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.",
      errInvalidToken: "Este enlace no es válido o ha caducado.",
      errNotAuthenticated: "Inicia sesión para continuar.",
      errNetwork: "No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.",
      errServer: "Algo ha fallado. Inténtalo de nuevo.",
    },

    nav: {
      home: "Inicio",
      allTools: "Todas las herramientas",
      images: "Imágenes",
      pdf: "PDF",
      convert: "Convertir",
      search: "Buscar",
      darkMode: "Modo oscuro",
      lightMode: "Modo claro",
      more: "Más",

      language: "Idioma",
      menu: "Menú",
      tools: "Herramientas",
      features: "Funciones",
      howItWorks: "Cómo funciona",
      faq: "Preguntas frecuentes",
      getStarted: "Empezar",    },

    common: {
      upload: "Subir",
      download: "Descargar",
      process: "Procesar",
      convert: "Convertir",
      compress: "Comprimir",
      resize: "Cambiar tamaño",
      edit: "Editar",
      remove: "Eliminar",
      clear: "Limpiar",
      reset: "Restablecer",
      save: "Guardar",
      cancel: "Cancelar",
      copy: "Copiar",
      copied: "Copiado",
      open: "Abrir",
      close: "Cerrar",
      back: "Atrás",
      next: "Siguiente",
      previous: "Anterior",
      selectFile: "Seleccionar archivo",
      selectFiles: "Seleccionar archivos",
      chooseFile: "Elegir archivo",
      chooseFiles: "Elegir archivos",
      dragDrop: "Arrastra y suelta tu archivo aquí",
      or: "o",
      browse: "Explorar",
      loading: "Cargando...",
      processing: "Procesando...",
      completed: "Completado",
      error: "Algo salió mal",
      tryAgain: "Intentar de nuevo",
      removeFile: "Eliminar archivo",
      downloadFile: "Descargar archivo",
      downloadFiles: "Descargar archivos",
      searchTools: "Buscar herramientas...",
      noResults: "No se encontraron resultados",
    },

    home: {
      heroTitle: "Todo lo que necesitas para trabajar con tus archivos.",
      heroDescription:
        "Convierte, comprime, cambia el tamaño, edita y administra imágenes, PDF y archivos cotidianos con herramientas online sencillas.",
      searchPlaceholder:
        "Buscar herramientas, PDF, imágenes, comprimir, convertir...",
      toolsLabel: "Herramientas",
      toolsTitle: "Encuentra la herramienta que necesitas.",
      toolsDescription:
        "Explora la colección o busca según lo que quieras hacer.",
      tool: "herramienta",
      tools: "herramientas",
      openTool: "Abrir herramienta",
      noToolsFound: "No se encontraron herramientas",
      noToolsDescription:
        "Prueba otro término de búsqueda o elige otra categoría.",
      clearSearch: "Limpiar búsqueda",
      all: "Todas",
      images: "Imágenes",
      pdf: "PDF",
      convert: "Convertir",
      compress: "Comprimir",
      productLabel: "ToolsGift",
      productTitle:
        "Herramientas útiles sin complicaciones innecesarias.",
      productDescription:
        "ToolsGift reúne herramientas cotidianas para archivos, documentos y utilidades en un solo lugar.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "Herramientas de imagen",
      organizePdf: "Organizar PDF",
      optimizePdf: "Optimizar PDF",
      convertToPdf: "Convertir a PDF",
      convertFromPdf: "Convertir desde PDF",
      editPdf: "Editar PDF",
      pdfSecurity: "Seguridad PDF",
      pdfIntelligence: "Inteligencia PDF",
      utilityOther: "Utilidades y otros",
    },

    footer: {
      about: "Acerca de",
      contact: "Contacto",
      privacy: "Privacidad",
      terms: "Términos",
      cookies: "Cookies",
      disclaimer: "Aviso legal",
      copyright: "© ToolsGift. Todos los derechos reservados.",
    },

    messages: {
      fileTooLarge: "El archivo es demasiado grande.",
      invalidFile: "Archivo no válido.",
      unsupportedFormat: "Formato de archivo no compatible.",
      uploadFailed: "La carga falló.",
      processingFailed: "El procesamiento falló.",
      somethingWentWrong:
        "Algo salió mal. Inténtalo de nuevo.",
      noFileSelected: "Selecciona primero un archivo.",
      multipleFilesRequired:
        "Selecciona varios archivos.",
    },
  },

  fr: {
    languageName: "Français",

    auth: {
      signIn: "Se connecter",
      signUp: "Créer un compte",
      signOut: "Se déconnecter",
      profile: "Profil",
      account: "Compte",
      planFree: "Offre gratuite",
      planPremium: "Offre premium",

      pleaseWait: "Veuillez patienter...",
      showPassword: "Afficher",
      hidePassword: "Masquer",

      name: "Nom",
      namePlaceholder: "Votre nom",
      email: "E-mail",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      currentPassword: "Mot de passe actuel",
      newPassword: "Nouveau mot de passe",
      passwordHint: "Au moins 8 caractères, avec une lettre et un chiffre.",

      loginTitle: "Bon retour",
      loginSubtitle: "Connectez-vous à votre compte ToolsGift.",
      loginCta: "Se connecter",
      forgotPassword: "Mot de passe oublié ?",
      noAccount: "Vous n'avez pas de compte ?",
      createAccountCta: "Créez-en un",

      signupTitle: "Créez votre compte",
      signupSubtitle: "Créez un compte gratuit pour gérer votre profil et vos réglages.",
      signupCta: "Créer un compte",
      haveAccount: "Vous avez déjà un compte ?",
      signInCta: "Se connecter",

      forgotTitle: "Réinitialiser votre mot de passe",
      forgotSubtitle: "Saisissez votre adresse e-mail et nous vous enverrons un lien de réinitialisation sécurisé.",
      sendResetLink: "Envoyer le lien",
      sentTitle: "Vérifiez votre boîte de réception",
      sentSubtitle: "Si un compte existe pour cette adresse, le lien est en chemin. Il expire dans 15 minutes.",
      backToLogin: "Retour à la connexion",

      resetTitle: "Choisissez un nouveau mot de passe",
      resetSubtitle: "Saisissez un nouveau mot de passe pour votre compte.",
      resetCta: "Mettre à jour le mot de passe",
      updatedTitle: "Mot de passe mis à jour",
      updatedSubtitle: "Votre mot de passe a été modifié. Toutes les autres sessions ont été déconnectées.",
      goToSignIn: "Continuer vers la connexion",
      invalidLinkTitle: "Ce lien n'est plus valide",
      invalidLinkSubtitle: "Les liens expirent après 15 minutes. Demandez-en un nouveau et réessayez.",

      memberSince: "Membre depuis",
      personalInfo: "Informations personnelles",
      personalInfoDesc: "Votre nom est affiché dans l'ensemble de votre compte ToolsGift.",
      security: "Sécurité",
      securityDesc: "Changez votre mot de passe. Cette action vous déconnectera partout ailleurs.",
      saveChanges: "Enregistrer les modifications",
      changesSaved: "Modifications enregistrées",
      changePasswordCta: "Changer le mot de passe",
      passwordChanged: "Mot de passe modifié",
      sessions: "Sessions",
      sessionsDesc: "Vous êtes connecté sur cet appareil. Se déconnecter partout met fin à toutes les sessions, y compris celle-ci.",
      signOutEverywhere: "Se déconnecter partout",

      continueWithGoogle: "Continuer avec Google",
      googleDivider: "ou",
      errGoogleCancelled: "La connexion Google a été annulée. Veuillez réessayer.",
      errGoogleFailed: "Une erreur s'est produite lors de la connexion avec Google. Veuillez réessayer.",
      errGoogleEmailTaken: "Ce compte Google n'est pas encore lié à votre compte ToolsGift. Connectez-vous d'abord avec votre mot de passe, puis liez-le depuis votre profil.",
      errGoogleNotConfigured: "La connexion Google n'est pas disponible pour le moment. Veuillez réessayer plus tard.",
      connectedAccounts: "Comptes liés",
      connectedAccountsDesc: "Liez votre compte Google pour vous connecter avec Google la prochaine fois.",
      googleLinked: "Lié",
      linkGoogle: "Lier le compte Google",
      errRequired: "Ce champ est obligatoire.",
      errInvalidEmail: "Saisissez une adresse e-mail valide.",
      errName: "Le nom doit contenir entre 2 et 80 caractères.",
      errWeakPassword: "Utilisez au moins 8 caractères avec une lettre et un chiffre.",
      errPasswordMismatch: "Les mots de passe ne correspondent pas.",
      errEmailTaken: "Un compte existe déjà avec cette adresse e-mail.",
      errInvalidCredentials: "E-mail ou mot de passe incorrect.",
      errWrongPassword: "Votre mot de passe actuel est incorrect.",
      errRateLimited: "Trop de tentatives. Patientez quelques minutes et réessayez.",
      errInvalidToken: "Ce lien est invalide ou a expiré.",
      errNotAuthenticated: "Connectez-vous pour continuer.",
      errNetwork: "Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.",
      errServer: "Une erreur est survenue. Veuillez réessayer.",
    },

    nav: {
      home: "Accueil",
      allTools: "Tous les outils",
      images: "Images",
      pdf: "PDF",
      convert: "Convertir",
      search: "Rechercher",
      darkMode: "Mode sombre",
      lightMode: "Mode clair",
      more: "Plus",

      language: "Langue",
      menu: "Menu",
      tools: "Outils",
      features: "Fonctionnalités",
      howItWorks: "Comment ça marche",
      faq: "FAQ",
      getStarted: "Commencer",    },

    common: {
      upload: "Téléverser",
      download: "Télécharger",
      process: "Traiter",
      convert: "Convertir",
      compress: "Compresser",
      resize: "Redimensionner",
      edit: "Modifier",
      remove: "Supprimer",
      clear: "Effacer",
      reset: "Réinitialiser",
      save: "Enregistrer",
      cancel: "Annuler",
      copy: "Copier",
      copied: "Copié",
      open: "Ouvrir",
      close: "Fermer",
      back: "Retour",
      next: "Suivant",
      previous: "Précédent",
      selectFile: "Sélectionner un fichier",
      selectFiles: "Sélectionner des fichiers",
      chooseFile: "Choisir un fichier",
      chooseFiles: "Choisir des fichiers",
      dragDrop: "Glissez-déposez votre fichier ici",
      or: "ou",
      browse: "Parcourir",
      loading: "Chargement...",
      processing: "Traitement...",
      completed: "Terminé",
      error: "Une erreur s'est produite",
      tryAgain: "Réessayer",
      removeFile: "Supprimer le fichier",
      downloadFile: "Télécharger le fichier",
      downloadFiles: "Télécharger les fichiers",
      searchTools: "Rechercher des outils...",
      noResults: "Aucun résultat trouvé",
    },

    home: {
      heroTitle:
        "Tout ce dont vous avez besoin pour travailler avec vos fichiers.",
      heroDescription:
        "Convertissez, compressez, redimensionnez, modifiez et gérez vos images, PDF et fichiers courants avec des outils en ligne simples.",
      searchPlaceholder:
        "Rechercher des outils, PDF, images, compresser, convertir...",
      toolsLabel: "Outils",
      toolsTitle: "Trouvez l'outil dont vous avez besoin.",
      toolsDescription:
        "Parcourez la collection ou recherchez selon ce que vous souhaitez faire.",
      tool: "outil",
      tools: "outils",
      openTool: "Ouvrir l'outil",
      noToolsFound: "Aucun outil trouvé",
      noToolsDescription:
        "Essayez un autre terme de recherche ou choisissez une autre catégorie.",
      clearSearch: "Effacer la recherche",
      all: "Tous",
      images: "Images",
      pdf: "PDF",
      convert: "Convertir",
      compress: "Compresser",
      productLabel: "ToolsGift",
      productTitle:
        "Des outils utiles sans complexité inutile.",
      productDescription:
        "ToolsGift réunit les outils quotidiens pour les fichiers, documents et utilitaires dans un seul endroit.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "Outils d'image",
      organizePdf: "Organiser les PDF",
      optimizePdf: "Optimiser les PDF",
      convertToPdf: "Convertir en PDF",
      convertFromPdf: "Convertir depuis un PDF",
      editPdf: "Modifier les PDF",
      pdfSecurity: "Sécurité PDF",
      pdfIntelligence: "Intelligence PDF",
      utilityOther: "Utilitaires et autres",
    },

    footer: {
      about: "À propos",
      contact: "Contact",
      privacy: "Confidentialité",
      terms: "Conditions",
      cookies: "Cookies",
      disclaimer: "Avertissement",
      copyright: "© ToolsGift. Tous droits réservés.",
    },

    messages: {
      fileTooLarge: "Le fichier est trop volumineux.",
      invalidFile: "Fichier non valide.",
      unsupportedFormat: "Format de fichier non pris en charge.",
      uploadFailed: "Échec du téléversement.",
      processingFailed: "Échec du traitement.",
      somethingWentWrong:
        "Une erreur s'est produite. Veuillez réessayer.",
      noFileSelected: "Veuillez d'abord sélectionner un fichier.",
      multipleFilesRequired:
        "Veuillez sélectionner plusieurs fichiers.",
    },
  },

  de: {
    languageName: "Deutsch",

    auth: {
      signIn: "Anmelden",
      signUp: "Konto erstellen",
      signOut: "Abmelden",
      profile: "Profil",
      account: "Konto",
      planFree: "Kostenloser Tarif",
      planPremium: "Premium-Tarif",

      pleaseWait: "Bitte warten...",
      showPassword: "Anzeigen",
      hidePassword: "Ausblenden",

      name: "Name",
      namePlaceholder: "Ihr Name",
      email: "E-Mail",
      password: "Passwort",
      confirmPassword: "Passwort bestätigen",
      currentPassword: "Aktuelles Passwort",
      newPassword: "Neues Passwort",
      passwordHint: "Mindestens 8 Zeichen, mit einem Buchstaben und einer Ziffer.",

      loginTitle: "Willkommen zurück",
      loginSubtitle: "Melden Sie sich bei Ihrem ToolsGift-Konto an.",
      loginCta: "Anmelden",
      forgotPassword: "Passwort vergessen?",
      noAccount: "Noch kein Konto?",
      createAccountCta: "Jetzt erstellen",

      signupTitle: "Konto erstellen",
      signupSubtitle: "Erstellen Sie ein kostenloses Konto, um Profil und Einstellungen zu verwalten.",
      signupCta: "Konto erstellen",
      haveAccount: "Sie haben bereits ein Konto?",
      signInCta: "Anmelden",

      forgotTitle: "Passwort zurücksetzen",
      forgotSubtitle: "Geben Sie Ihre E-Mail-Adresse ein, wir senden Ihnen einen sicheren Link.",
      sendResetLink: "Link senden",
      sentTitle: "Postfach prüfen",
      sentSubtitle: "Falls für diese Adresse ein Konto existiert, ist der Link unterwegs. Er läuft in 15 Minuten ab.",
      backToLogin: "Zurück zur Anmeldung",

      resetTitle: "Neues Passwort wählen",
      resetSubtitle: "Geben Sie ein neues Passwort für Ihr Konto ein.",
      resetCta: "Passwort aktualisieren",
      updatedTitle: "Passwort aktualisiert",
      updatedSubtitle: "Ihr Passwort wurde geändert. Alle anderen Sitzungen wurden abgemeldet.",
      goToSignIn: "Weiter zur Anmeldung",
      invalidLinkTitle: "Dieser Link ist nicht mehr gültig",
      invalidLinkSubtitle: "Links laufen nach 15 Minuten ab. Fordern Sie einen neuen an und versuchen Sie es erneut.",

      memberSince: "Mitglied seit",
      personalInfo: "Persönliche Daten",
      personalInfoDesc: "Ihr Name wird in Ihrem gesamten ToolsGift-Konto angezeigt.",
      security: "Sicherheit",
      securityDesc: "Ändern Sie Ihr Passwort. Dabei werden Sie überall anders abgemeldet.",
      saveChanges: "Änderungen speichern",
      changesSaved: "Änderungen gespeichert",
      changePasswordCta: "Passwort ändern",
      passwordChanged: "Passwort geändert",
      sessions: "Sitzungen",
      sessionsDesc: "Sie sind auf diesem Gerät angemeldet. Eine Abmeldung überall beendet alle Sitzungen, auch diese.",
      signOutEverywhere: "Überall abmelden",

      continueWithGoogle: "Mit Google fortfahren",
      googleDivider: "oder",
      errGoogleCancelled: "Die Google-Anmeldung wurde abgebrochen. Bitte versuchen Sie es erneut.",
      errGoogleFailed: "Bei der Anmeldung mit Google ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      errGoogleEmailTaken: "Dieses Google-Konto ist noch nicht mit Ihrem ToolsGift-Konto verknüpft. Melden Sie sich zuerst mit Ihrem Passwort an und verknüpfen Sie es dann in Ihrem Profil.",
      errGoogleNotConfigured: "Die Google-Anmeldung ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.",
      connectedAccounts: "Verknüpfte Konten",
      connectedAccountsDesc: "Verknüpfen Sie Ihr Google-Konto, um sich beim nächsten Mal mit Google anzumelden.",
      googleLinked: "Verknüpft",
      linkGoogle: "Google-Konto verknüpfen",
      errRequired: "Dieses Feld ist erforderlich.",
      errInvalidEmail: "Geben Sie eine gültige E-Mail-Adresse ein.",
      errName: "Der Name muss zwischen 2 und 80 Zeichen lang sein.",
      errWeakPassword: "Verwenden Sie mindestens 8 Zeichen mit einem Buchstaben und einer Ziffer.",
      errPasswordMismatch: "Die Passwörter stimmen nicht überein.",
      errEmailTaken: "Für diese E-Mail-Adresse existiert bereits ein Konto.",
      errInvalidCredentials: "E-Mail oder Passwort falsch.",
      errWrongPassword: "Ihr aktuelles Passwort ist falsch.",
      errRateLimited: "Zu viele Versuche. Warten Sie einige Minuten und versuchen Sie es erneut.",
      errInvalidToken: "Dieser Link ist ungültig oder abgelaufen.",
      errNotAuthenticated: "Melden Sie sich an, um fortzufahren.",
      errNetwork: "Server nicht erreichbar. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
      errServer: "Etwas ist schiefgelaufen. Versuchen Sie es erneut.",
    },

    nav: {
      home: "Startseite",
      allTools: "Alle Tools",
      images: "Bilder",
      pdf: "PDF",
      convert: "Konvertieren",
      search: "Suchen",
      darkMode: "Dunkler Modus",
      lightMode: "Heller Modus",
      more: "Mehr",

      language: "Sprache",
      menu: "Menü",
      tools: "Tools",
      features: "Funktionen",
      howItWorks: "So funktioniert es",
      faq: "FAQ",
      getStarted: "Loslegen",    },

    common: {
      upload: "Hochladen",
      download: "Herunterladen",
      process: "Verarbeiten",
      convert: "Konvertieren",
      compress: "Komprimieren",
      resize: "Größe ändern",
      edit: "Bearbeiten",
      remove: "Entfernen",
      clear: "Löschen",
      reset: "Zurücksetzen",
      save: "Speichern",
      cancel: "Abbrechen",
      copy: "Kopieren",
      copied: "Kopiert",
      open: "Öffnen",
      close: "Schließen",
      back: "Zurück",
      next: "Weiter",
      previous: "Zurück",
      selectFile: "Datei auswählen",
      selectFiles: "Dateien auswählen",
      chooseFile: "Datei auswählen",
      chooseFiles: "Dateien auswählen",
      dragDrop: "Datei hierher ziehen und ablegen",
      or: "oder",
      browse: "Durchsuchen",
      loading: "Wird geladen...",
      processing: "Wird verarbeitet...",
      completed: "Abgeschlossen",
      error: "Etwas ist schiefgelaufen",
      tryAgain: "Erneut versuchen",
      removeFile: "Datei entfernen",
      downloadFile: "Datei herunterladen",
      downloadFiles: "Dateien herunterladen",
      searchTools: "Tools suchen...",
      noResults: "Keine Ergebnisse gefunden",
    },

    home: {
      heroTitle:
        "Alles, was du für die Arbeit mit deinen Dateien brauchst.",
      heroDescription:
        "Konvertiere, komprimiere, ändere die Größe, bearbeite und verwalte Bilder, PDF-Dateien und alltägliche Dateien mit einfachen Online-Tools.",
      searchPlaceholder:
        "Tools, PDF, Bilder, Komprimieren, Konvertieren suchen...",
      toolsLabel: "Tools",
      toolsTitle: "Finde das passende Tool.",
      toolsDescription:
        "Durchsuche die Sammlung oder suche nach deiner Aufgabe.",
      tool: "Tool",
      tools: "Tools",
      openTool: "Tool öffnen",
      noToolsFound: "Keine Tools gefunden",
      noToolsDescription:
        "Versuche einen anderen Suchbegriff oder wähle eine andere Kategorie.",
      clearSearch: "Suche löschen",
      all: "Alle",
      images: "Bilder",
      pdf: "PDF",
      convert: "Konvertieren",
      compress: "Komprimieren",
      productLabel: "ToolsGift",
      productTitle:
        "Nützliche Tools ohne unnötige Komplexität.",
      productDescription:
        "ToolsGift vereint alltägliche Datei-, Dokument- und Utility-Tools an einem Ort.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "Bild-Tools",
      organizePdf: "PDF organisieren",
      optimizePdf: "PDF optimieren",
      convertToPdf: "In PDF konvertieren",
      convertFromPdf: "Aus PDF konvertieren",
      editPdf: "PDF bearbeiten",
      pdfSecurity: "PDF-Sicherheit",
      pdfIntelligence: "PDF-Intelligenz",
      utilityOther: "Utility & Sonstige",
    },

    footer: {
      about: "Über uns",
      contact: "Kontakt",
      privacy: "Datenschutz",
      terms: "Bedingungen",
      cookies: "Cookies",
      disclaimer: "Haftungsausschluss",
      copyright: "© ToolsGift. Alle Rechte vorbehalten.",
    },

    messages: {
      fileTooLarge: "Die Datei ist zu groß.",
      invalidFile: "Ungültige Datei.",
      unsupportedFormat: "Nicht unterstütztes Dateiformat.",
      uploadFailed: "Upload fehlgeschlagen.",
      processingFailed: "Verarbeitung fehlgeschlagen.",
      somethingWentWrong:
        "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
      noFileSelected:
        "Bitte wähle zuerst eine Datei aus.",
      multipleFilesRequired:
        "Bitte wähle mehrere Dateien aus.",
    },
  },

  it: {
    languageName: "Italiano",

    auth: {
      signIn: "Accedi",
      signUp: "Crea account",
      signOut: "Esci",
      profile: "Profilo",
      account: "Account",
      planFree: "Piano gratuito",
      planPremium: "Piano premium",

      pleaseWait: "Attendi...",
      showPassword: "Mostra",
      hidePassword: "Nascondi",

      name: "Nome",
      namePlaceholder: "Il tuo nome",
      email: "Email",
      password: "Password",
      confirmPassword: "Conferma password",
      currentPassword: "Password attuale",
      newPassword: "Nuova password",
      passwordHint: "Almeno 8 caratteri, con una lettera e un numero.",

      loginTitle: "Bentornato",
      loginSubtitle: "Accedi al tuo account ToolsGift.",
      loginCta: "Accedi",
      forgotPassword: "Hai dimenticato la password?",
      noAccount: "Non hai un account?",
      createAccountCta: "Creane uno",

      signupTitle: "Crea il tuo account",
      signupSubtitle: "Crea un account gratuito per gestire profilo e impostazioni.",
      signupCta: "Crea account",
      haveAccount: "Hai già un account?",
      signInCta: "Accedi",

      forgotTitle: "Reimposta la password",
      forgotSubtitle: "Inserisci il tuo indirizzo email e ti invieremo un link sicuro per il ripristino.",
      sendResetLink: "Invia link",
      sentTitle: "Controlla la posta",
      sentSubtitle: "Se esiste un account per quell'indirizzo, il link è in arrivo. Scade tra 15 minuti.",
      backToLogin: "Torna all'accesso",

      resetTitle: "Scegli una nuova password",
      resetSubtitle: "Inserisci una nuova password per il tuo account.",
      resetCta: "Aggiorna password",
      updatedTitle: "Password aggiornata",
      updatedSubtitle: "La password è stata modificata. Tutte le altre sessioni sono state disconnesse.",
      goToSignIn: "Continua all'accesso",
      invalidLinkTitle: "Questo link non è più valido",
      invalidLinkSubtitle: "I link scadono dopo 15 minuti. Richiedine uno nuovo e riprova.",

      memberSince: "Membro dal",
      personalInfo: "Informazioni personali",
      personalInfoDesc: "Il tuo nome viene mostrato in tutto l'account ToolsGift.",
      security: "Sicurezza",
      securityDesc: "Cambia la password. In questo modo verrai disconnesso ovunque altrove.",
      saveChanges: "Salva modifiche",
      changesSaved: "Modifiche salvate",
      changePasswordCta: "Cambia password",
      passwordChanged: "Password cambiata",
      sessions: "Sessioni",
      sessionsDesc: "Sei connesso su questo dispositivo. Uscire ovunque termina tutte le sessioni, inclusa questa.",
      signOutEverywhere: "Esci da ovunque",

      continueWithGoogle: "Continua con Google",
      googleDivider: "oppure",
      errGoogleCancelled: "L'accesso con Google è stato annullato. Riprova.",
      errGoogleFailed: "Qualcosa è andato storto durante l'accesso con Google. Riprova.",
      errGoogleEmailTaken: "Questo account Google non è ancora collegato al tuo account ToolsGift. Accedi prima con la tua password, poi collegalo dal tuo profilo.",
      errGoogleNotConfigured: "L'accesso con Google non è al momento disponibile. Riprova più tardi.",
      connectedAccounts: "Account collegati",
      connectedAccountsDesc: "Collega il tuo account Google per accedere con Google la prossima volta.",
      googleLinked: "Collegato",
      linkGoogle: "Collega account Google",
      errRequired: "Questo campo è obbligatorio.",
      errInvalidEmail: "Inserisci un indirizzo email valido.",
      errName: "Il nome deve contenere da 2 a 80 caratteri.",
      errWeakPassword: "Usa almeno 8 caratteri con una lettera e un numero.",
      errPasswordMismatch: "Le password non coincidono.",
      errEmailTaken: "Esiste già un account con questo indirizzo email.",
      errInvalidCredentials: "Email o password errati.",
      errWrongPassword: "La password attuale non è corretta.",
      errRateLimited: "Troppi tentativi. Attendi qualche minuto e riprova.",
      errInvalidToken: "Questo link non è valido o è scaduto.",
      errNotAuthenticated: "Accedi per continuare.",
      errNetwork: "Impossibile contattare il server. Controlla la connessione e riprova.",
      errServer: "Qualcosa è andato storto. Riprova.",
    },

    nav: {
      home: "Home",
      allTools: "Tutti gli strumenti",
      images: "Immagini",
      pdf: "PDF",
      convert: "Converti",
      search: "Cerca",
      darkMode: "Modalità scura",
      lightMode: "Modalità chiara",
      more: "Altro",

      language: "Lingua",
      menu: "Menu",
      tools: "Strumenti",
      features: "Funzionalità",
      howItWorks: "Come funziona",
      faq: "FAQ",
      getStarted: "Inizia",    },

    common: {
      upload: "Carica",
      download: "Scarica",
      process: "Elabora",
      convert: "Converti",
      compress: "Comprimi",
      resize: "Ridimensiona",
      edit: "Modifica",
      remove: "Rimuovi",
      clear: "Cancella",
      reset: "Reimposta",
      save: "Salva",
      cancel: "Annulla",
      copy: "Copia",
      copied: "Copiato",
      open: "Apri",
      close: "Chiudi",
      back: "Indietro",
      next: "Avanti",
      previous: "Precedente",
      selectFile: "Seleziona file",
      selectFiles: "Seleziona file",
      chooseFile: "Scegli file",
      chooseFiles: "Scegli file",
      dragDrop: "Trascina e rilascia il file qui",
      or: "o",
      browse: "Sfoglia",
      loading: "Caricamento...",
      processing: "Elaborazione...",
      completed: "Completato",
      error: "Qualcosa è andato storto",
      tryAgain: "Riprova",
      removeFile: "Rimuovi file",
      downloadFile: "Scarica file",
      downloadFiles: "Scarica file",
      searchTools: "Cerca strumenti...",
      noResults: "Nessun risultato trovato",
    },

    home: {
      heroTitle:
        "Tutto ciò che ti serve per lavorare con i tuoi file.",
      heroDescription:
        "Converti, comprimi, ridimensiona, modifica e gestisci immagini, PDF e file quotidiani con semplici strumenti online.",
      searchPlaceholder:
        "Cerca strumenti, PDF, immagini, comprimi, converti...",
      toolsLabel: "Strumenti",
      toolsTitle: "Trova lo strumento che ti serve.",
      toolsDescription:
        "Esplora la raccolta o cerca in base a ciò che vuoi fare.",
      tool: "strumento",
      tools: "strumenti",
      openTool: "Apri strumento",
      noToolsFound: "Nessuno strumento trovato",
      noToolsDescription:
        "Prova un altro termine di ricerca o scegli un'altra categoria.",
      clearSearch: "Cancella ricerca",
      all: "Tutti",
      images: "Immagini",
      pdf: "PDF",
      convert: "Converti",
      compress: "Comprimi",
      productLabel: "ToolsGift",
      productTitle:
        "Strumenti utili senza complessità inutile.",
      productDescription:
        "ToolsGift riunisce strumenti quotidiani per file, documenti e utilità in un unico posto.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "Strumenti immagine",
      organizePdf: "Organizza PDF",
      optimizePdf: "Ottimizza PDF",
      convertToPdf: "Converti in PDF",
      convertFromPdf: "Converti da PDF",
      editPdf: "Modifica PDF",
      pdfSecurity: "Sicurezza PDF",
      pdfIntelligence: "Intelligenza PDF",
      utilityOther: "Utilità e altro",
    },

    footer: {
      about: "Chi siamo",
      contact: "Contatti",
      privacy: "Privacy",
      terms: "Termini",
      cookies: "Cookie",
      disclaimer: "Disclaimer",
      copyright: "© ToolsGift. Tutti i diritti riservati.",
    },

    messages: {
      fileTooLarge: "Il file è troppo grande.",
      invalidFile: "File non valido.",
      unsupportedFormat: "Formato file non supportato.",
      uploadFailed: "Caricamento non riuscito.",
      processingFailed: "Elaborazione non riuscita.",
      somethingWentWrong:
        "Qualcosa è andato storto. Riprova.",
      noFileSelected: "Seleziona prima un file.",
      multipleFilesRequired:
        "Seleziona più file.",
    },
  },

  pt: {
    languageName: "Português",

    auth: {
      signIn: "Entrar",
      signUp: "Criar conta",
      signOut: "Sair",
      profile: "Perfil",
      account: "Conta",
      planFree: "Plano gratuito",
      planPremium: "Plano premium",

      pleaseWait: "Aguarde...",
      showPassword: "Mostrar",
      hidePassword: "Ocultar",

      name: "Nome",
      namePlaceholder: "Seu nome",
      email: "E-mail",
      password: "Senha",
      confirmPassword: "Confirmar senha",
      currentPassword: "Senha atual",
      newPassword: "Nova senha",
      passwordHint: "Pelo menos 8 caracteres, com uma letra e um número.",

      loginTitle: "Bem-vindo de volta",
      loginSubtitle: "Entre na sua conta ToolsGift.",
      loginCta: "Entrar",
      forgotPassword: "Esqueceu sua senha?",
      noAccount: "Não tem uma conta?",
      createAccountCta: "Crie uma",

      signupTitle: "Crie sua conta",
      signupSubtitle: "Crie uma conta gratuita para gerenciar seu perfil e suas configurações.",
      signupCta: "Criar conta",
      haveAccount: "Já tem uma conta?",
      signInCta: "Entrar",

      forgotTitle: "Redefinir sua senha",
      forgotSubtitle: "Digite seu e-mail e enviaremos um link seguro de redefinição.",
      sendResetLink: "Enviar link",
      sentTitle: "Verifique sua caixa de entrada",
      sentSubtitle: "Se existir uma conta para esse endereço, o link está a caminho. Ele expira em 15 minutos.",
      backToLogin: "Voltar ao login",

      resetTitle: "Escolha uma nova senha",
      resetSubtitle: "Digite uma nova senha para a sua conta.",
      resetCta: "Atualizar senha",
      updatedTitle: "Senha atualizada",
      updatedSubtitle: "Sua senha foi alterada. Todas as outras sessões foram encerradas.",
      goToSignIn: "Continuar para o login",
      invalidLinkTitle: "Este link não é mais válido",
      invalidLinkSubtitle: "Links de redefinição expiram em 15 minutos. Solicite um novo e tente novamente.",

      memberSince: "Membro desde",
      personalInfo: "Informações pessoais",
      personalInfoDesc: "Seu nome é exibido em toda a sua conta ToolsGift.",
      security: "Segurança",
      securityDesc: "Altere sua senha. Ao alterá-la, você é desconectado em todos os outros dispositivos.",
      saveChanges: "Salvar alterações",
      changesSaved: "Alterações salvas",
      changePasswordCta: "Alterar senha",
      passwordChanged: "Senha alterada",
      sessions: "Sessões",
      sessionsDesc: "Você está conectado neste dispositivo. Sair de todos encerra todas as sessões, incluindo esta.",
      signOutEverywhere: "Sair em todos os dispositivos",

      continueWithGoogle: "Continuar com Google",
      googleDivider: "ou",
      errGoogleCancelled: "O login com Google foi cancelado. Tente novamente.",
      errGoogleFailed: "Algo deu errado ao entrar com Google. Tente novamente.",
      errGoogleEmailTaken: "Esta conta do Google ainda não está vinculada à sua conta do ToolsGift. Entre primeiro com sua senha e depois vincule-a no seu perfil.",
      errGoogleNotConfigured: "O login com Google não está disponível no momento. Tente novamente mais tarde.",
      connectedAccounts: "Contas vinculadas",
      connectedAccountsDesc: "Vincule sua conta do Google para entrar com Google da próxima vez.",
      googleLinked: "Vinculada",
      linkGoogle: "Vincular conta do Google",
      errRequired: "Este campo é obrigatório.",
      errInvalidEmail: "Digite um e-mail válido.",
      errName: "O nome deve ter entre 2 e 80 caracteres.",
      errWeakPassword: "Use pelo menos 8 caracteres com uma letra e um número.",
      errPasswordMismatch: "As senhas não coincidem.",
      errEmailTaken: "Já existe uma conta com este e-mail.",
      errInvalidCredentials: "E-mail ou senha incorretos.",
      errWrongPassword: "Sua senha atual está incorreta.",
      errRateLimited: "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
      errInvalidToken: "Este link é inválido ou expirou.",
      errNotAuthenticated: "Entre para continuar.",
      errNetwork: "Não foi possível acessar o servidor. Verifique sua conexão e tente novamente.",
      errServer: "Algo deu errado. Tente novamente.",
    },

    nav: {
      home: "Início",
      allTools: "Todas as ferramentas",
      images: "Imagens",
      pdf: "PDF",
      convert: "Converter",
      search: "Pesquisar",
      darkMode: "Modo escuro",
      lightMode: "Modo claro",
      more: "Mais",

      language: "Idioma",
      menu: "Menu",
      tools: "Ferramentas",
      features: "Recursos",
      howItWorks: "Como funciona",
      faq: "Perguntas frequentes",
      getStarted: "Começar",    },

    common: {
      upload: "Enviar",
      download: "Baixar",
      process: "Processar",
      convert: "Converter",
      compress: "Comprimir",
      resize: "Redimensionar",
      edit: "Editar",
      remove: "Remover",
      clear: "Limpar",
      reset: "Redefinir",
      save: "Salvar",
      cancel: "Cancelar",
      copy: "Copiar",
      copied: "Copiado",
      open: "Abrir",
      close: "Fechar",
      back: "Voltar",
      next: "Próximo",
      previous: "Anterior",
      selectFile: "Selecionar arquivo",
      selectFiles: "Selecionar arquivos",
      chooseFile: "Escolher arquivo",
      chooseFiles: "Escolher arquivos",
      dragDrop: "Arraste e solte seu arquivo aqui",
      or: "ou",
      browse: "Procurar",
      loading: "Carregando...",
      processing: "Processando...",
      completed: "Concluído",
      error: "Algo deu errado",
      tryAgain: "Tentar novamente",
      removeFile: "Remover arquivo",
      downloadFile: "Baixar arquivo",
      downloadFiles: "Baixar arquivos",
      searchTools: "Pesquisar ferramentas...",
      noResults: "Nenhum resultado encontrado",
    },

    home: {
      heroTitle:
        "Tudo o que você precisa para trabalhar com seus arquivos.",
      heroDescription:
        "Converta, comprima, redimensione, edite e gerencie imagens, PDFs e arquivos do dia a dia com ferramentas online simples.",
      searchPlaceholder:
        "Pesquisar ferramentas, PDF, imagem, comprimir, converter...",
      toolsLabel: "Ferramentas",
      toolsTitle: "Encontre a ferramenta que você precisa.",
      toolsDescription:
        "Explore a coleção ou pesquise pelo que deseja fazer.",
      tool: "ferramenta",
      tools: "ferramentas",
      openTool: "Abrir ferramenta",
      noToolsFound: "Nenhuma ferramenta encontrada",
      noToolsDescription:
        "Tente outro termo de pesquisa ou escolha outra categoria.",
      clearSearch: "Limpar pesquisa",
      all: "Todas",
      images: "Imagens",
      pdf: "PDF",
      convert: "Converter",
      compress: "Comprimir",
      productLabel: "ToolsGift",
      productTitle:
        "Ferramentas úteis sem complexidade desnecessária.",
      productDescription:
        "ToolsGift reúne ferramentas para arquivos, documentos e utilidades em um único lugar.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "Ferramentas de imagem",
      organizePdf: "Organizar PDF",
      optimizePdf: "Otimizar PDF",
      convertToPdf: "Converter para PDF",
      convertFromPdf: "Converter de PDF",
      editPdf: "Editar PDF",
      pdfSecurity: "Segurança PDF",
      pdfIntelligence: "Inteligência PDF",
      utilityOther: "Utilidades e outros",
    },

    footer: {
      about: "Sobre",
      contact: "Contato",
      privacy: "Privacidade",
      terms: "Termos",
      cookies: "Cookies",
      disclaimer: "Aviso legal",
      copyright: "© ToolsGift. Todos os direitos reservados.",
    },

    messages: {
      fileTooLarge: "O arquivo é muito grande.",
      invalidFile: "Arquivo inválido.",
      unsupportedFormat: "Formato de arquivo não suportado.",
      uploadFailed: "Falha no envio.",
      processingFailed: "Falha no processamento.",
      somethingWentWrong:
        "Algo deu errado. Tente novamente.",
      noFileSelected:
        "Selecione um arquivo primeiro.",
      multipleFilesRequired:
        "Selecione vários arquivos.",
    },
  },

  ja: {
    languageName: "日本語",

    auth: {
      signIn: "ログイン",
      signUp: "アカウント作成",
      signOut: "ログアウト",
      profile: "プロフィール",
      account: "アカウント",
      planFree: "無料プラン",
      planPremium: "プレミアムプラン",

      pleaseWait: "お待ちください...",
      showPassword: "表示",
      hidePassword: "非表示",

      name: "名前",
      namePlaceholder: "お名前",
      email: "メールアドレス",
      password: "パスワード",
      confirmPassword: "パスワード（確認）",
      currentPassword: "現在のパスワード",
      newPassword: "新しいパスワード",
      passwordHint: "8文字以上で、英字と数字を含めてください。",

      loginTitle: "おかえりなさい",
      loginSubtitle: "ToolsGiftアカウントにログインします。",
      loginCta: "ログイン",
      forgotPassword: "パスワードをお忘れですか？",
      noAccount: "アカウントをお持ちでないですか？",
      createAccountCta: "作成する",

      signupTitle: "アカウントを作成",
      signupSubtitle: "プロフィールと設定を管理するための無料アカウントを作成します。",
      signupCta: "アカウントを作成",
      haveAccount: "すでにアカウントをお持ちですか？",
      signInCta: "ログイン",

      forgotTitle: "パスワードのリセット",
      forgotSubtitle: "メールアドレスを入力すると、安全なリセット用リンクを送信します。",
      sendResetLink: "リンクを送信",
      sentTitle: "受信トレイをご確認ください",
      sentSubtitle: "そのアドレスのアカウントが存在する場合、リセット用リンクを送信しました。リンクの有効期限は15分です。",
      backToLogin: "ログインに戻る",

      resetTitle: "新しいパスワードを設定",
      resetSubtitle: "アカウントの新しいパスワードを入力してください。",
      resetCta: "パスワードを更新",
      updatedTitle: "パスワードを更新しました",
      updatedSubtitle: "パスワードを変更しました。他のすべてのセッションはログアウトされました。",
      goToSignIn: "ログインへ進む",
      invalidLinkTitle: "このリンクは無効です",
      invalidLinkSubtitle: "リセット用リンクの有効期限は15分です。新しいリンクをリクエストして再試行してください。",

      memberSince: "登録日",
      personalInfo: "個人情報",
      personalInfoDesc: "お名前はToolsGiftアカウント全体に表示されます。",
      security: "セキュリティ",
      securityDesc: "パスワードを変更します。変更すると、他のすべての端末からログアウトされます。",
      saveChanges: "変更を保存",
      changesSaved: "変更を保存しました",
      changePasswordCta: "パスワードを変更",
      passwordChanged: "パスワードを変更しました",
      sessions: "セッション",
      sessionsDesc: "この端末でログイン中です。すべての端末でログアウトすると、このセッションを含むすべてのセッションが終了します。",
      signOutEverywhere: "すべてログアウト",

      continueWithGoogle: "Google で続行",
      googleDivider: "または",
      errGoogleCancelled: "Google ログインがキャンセルされました。もう一度お試しください。",
      errGoogleFailed: "Google でサインイン中に問題が発生しました。もう一度お試しください。",
      errGoogleEmailTaken: "この Google アカウントはまだ ToolsGift アカウントと連携されていません。まずパスワードでサインインし、その後プロフィールから連携してください。",
      errGoogleNotConfigured: "現在 Google サインインはご利用いただけません。後でもう一度お試しください。",
      connectedAccounts: "連携しているアカウント",
      connectedAccountsDesc: "次回から Google でサインインできるように、Google アカウントを連携します。",
      googleLinked: "連携済み",
      linkGoogle: "Google アカウントを連携",
      errRequired: "この項目は必須です。",
      errInvalidEmail: "有効なメールアドレスを入力してください。",
      errName: "名前は2〜80文字で入力してください。",
      errWeakPassword: "英字と数字を含む8文字以上を使用してください。",
      errPasswordMismatch: "パスワードが一致しません。",
      errEmailTaken: "このメールアドレスのアカウントは既に存在します。",
      errInvalidCredentials: "メールアドレスまたはパスワードが正しくありません。",
      errWrongPassword: "現在のパスワードが正しくありません。",
      errRateLimited: "試行回数が多すぎます。数分待ってから再試行してください。",
      errInvalidToken: "このリンクは無効か、期限が切れています。",
      errNotAuthenticated: "続行するにはログインしてください。",
      errNetwork: "サーバーに接続できませんでした。接続を確認して再試行してください。",
      errServer: "問題が発生しました。もう一度お試しください。",
    },

    nav: {
      home: "ホーム",
      allTools: "すべてのツール",
      images: "画像",
      pdf: "PDF",
      convert: "変換",
      search: "検索",
      darkMode: "ダークモード",
      lightMode: "ライトモード",
      more: "その他",

      language: "言語",
      menu: "メニュー",
      tools: "ツール",
      features: "機能",
      howItWorks: "使い方",
      faq: "よくある質問",
      getStarted: "始める",    },

    common: {
      upload: "アップロード",
      download: "ダウンロード",
      process: "処理",
      convert: "変換",
      compress: "圧縮",
      resize: "サイズ変更",
      edit: "編集",
      remove: "削除",
      clear: "クリア",
      reset: "リセット",
      save: "保存",
      cancel: "キャンセル",
      copy: "コピー",
      copied: "コピーしました",
      open: "開く",
      close: "閉じる",
      back: "戻る",
      next: "次へ",
      previous: "前へ",
      selectFile: "ファイルを選択",
      selectFiles: "ファイルを選択",
      chooseFile: "ファイルを選ぶ",
      chooseFiles: "ファイルを選ぶ",
      dragDrop: "ここにファイルをドラッグ＆ドロップ",
      or: "または",
      browse: "参照",
      loading: "読み込み中...",
      processing: "処理中...",
      completed: "完了しました",
      error: "問題が発生しました",
      tryAgain: "もう一度試す",
      removeFile: "ファイルを削除",
      downloadFile: "ファイルをダウンロード",
      downloadFiles: "ファイルをダウンロード",
      searchTools: "ツールを検索...",
      noResults: "結果が見つかりません",
    },

    home: {
      heroTitle: "ファイルを扱うために必要なものがすべて揃っています。",
      heroDescription:
        "画像、PDF、日常的なファイルを簡単なオンラインツールで変換、圧縮、サイズ変更、編集、管理できます。",
      searchPlaceholder:
        "ツール、PDF、画像、圧縮、変換を検索...",
      toolsLabel: "ツール",
      toolsTitle: "必要なツールを見つける。",
      toolsDescription:
        "ツールを閲覧するか、目的から検索してください。",
      tool: "ツール",
      tools: "ツール",
      openTool: "ツールを開く",
      noToolsFound: "ツールが見つかりません",
      noToolsDescription:
        "別の検索語を試すか、別のカテゴリーを選択してください。",
      clearSearch: "検索をクリア",
      all: "すべて",
      images: "画像",
      pdf: "PDF",
      convert: "変換",
      compress: "圧縮",
      productLabel: "ToolsGift",
      productTitle: "不要な複雑さのない便利なツール。",
      productDescription:
        "ToolsGiftは、ファイル、ドキュメント、日常の作業に役立つツールを一つの場所にまとめています。",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "画像ツール",
      organizePdf: "PDFを整理",
      optimizePdf: "PDFを最適化",
      convertToPdf: "PDFに変換",
      convertFromPdf: "PDFから変換",
      editPdf: "PDFを編集",
      pdfSecurity: "PDFセキュリティ",
      pdfIntelligence: "PDFインテリジェンス",
      utilityOther: "ユーティリティとその他",
    },

    footer: {
      about: "概要",
      contact: "お問い合わせ",
      privacy: "プライバシー",
      terms: "利用規約",
      cookies: "Cookie",
      disclaimer: "免責事項",
      copyright: "© ToolsGift. 無断転載を禁じます。",
    },

    messages: {
      fileTooLarge: "ファイルが大きすぎます。",
      invalidFile: "無効なファイルです。",
      unsupportedFormat: "対応していないファイル形式です。",
      uploadFailed: "アップロードに失敗しました。",
      processingFailed: "処理に失敗しました。",
      somethingWentWrong:
        "問題が発生しました。もう一度お試しください。",
      noFileSelected: "まずファイルを選択してください。",
      multipleFilesRequired:
        "複数のファイルを選択してください。",
    },
  },

  ru: {
    languageName: "Русский",

    auth: {
      signIn: "Войти",
      signUp: "Создать аккаунт",
      signOut: "Выйти",
      profile: "Профиль",
      account: "Аккаунт",
      planFree: "Бесплатный тариф",
      planPremium: "Премиум-тариф",

      pleaseWait: "Подождите...",
      showPassword: "Показать",
      hidePassword: "Скрыть",

      name: "Имя",
      namePlaceholder: "Ваше имя",
      email: "Эл. почта",
      password: "Пароль",
      confirmPassword: "Подтвердите пароль",
      currentPassword: "Текущий пароль",
      newPassword: "Новый пароль",
      passwordHint: "Не менее 8 символов, включая букву и цифру.",

      loginTitle: "С возвращением",
      loginSubtitle: "Войдите в свой аккаунт ToolsGift.",
      loginCta: "Войти",
      forgotPassword: "Забыли пароль?",
      noAccount: "Нет аккаунта?",
      createAccountCta: "Создайте его",

      signupTitle: "Создайте аккаунт",
      signupSubtitle: "Создайте бесплатный аккаунт, чтобы управлять профилем и настройками.",
      signupCta: "Создать аккаунт",
      haveAccount: "Уже есть аккаунт?",
      signInCta: "Войти",

      forgotTitle: "Сброс пароля",
      forgotSubtitle: "Введите адрес эл. почты, и мы отправим вам безопасную ссылку для сброса.",
      sendResetLink: "Отправить ссылку",
      sentTitle: "Проверьте почту",
      sentSubtitle: "Если для этого адреса есть аккаунт, ссылка уже в пути. Она истекает через 15 минут.",
      backToLogin: "Вернуться ко входу",

      resetTitle: "Выберите новый пароль",
      resetSubtitle: "Введите новый пароль для аккаунта.",
      resetCta: "Обновить пароль",
      updatedTitle: "Пароль обновлён",
      updatedSubtitle: "Пароль изменён. Все остальные сеансы завершены.",
      goToSignIn: "Перейти ко входу",
      invalidLinkTitle: "Эта ссылка больше не действительна",
      invalidLinkSubtitle: "Ссылки для сброса истекают через 15 минут. Запросите новую и попробуйте снова.",

      memberSince: "Участник с",
      personalInfo: "Личные данные",
      personalInfoDesc: "Ваше имя отображается во всём аккаунте ToolsGift.",
      security: "Безопасность",
      securityDesc: "Измените пароль. После изменения вы будете завершены на всех других устройствах.",
      saveChanges: "Сохранить изменения",
      changesSaved: "Изменения сохранены",
      changePasswordCta: "Изменить пароль",
      passwordChanged: "Пароль изменён",
      sessions: "Сеансы",
      sessionsDesc: "Вы вошли на этом устройстве. Выход везде завершает все сеансы, включая этот.",
      signOutEverywhere: "Выйти везде",

      continueWithGoogle: "Продолжить с Google",
      googleDivider: "или",
      errGoogleCancelled: "Вход через Google отменён. Попробуйте ещё раз.",
      errGoogleFailed: "Не удалось войти через Google. Попробуйте ещё раз.",
      errGoogleEmailTaken: "Этот аккаунт Google ещё не привязан к вашему аккаунту ToolsGift. Сначала войдите с паролем, затем привяжите его в профиле.",
      errGoogleNotConfigured: "Вход через Google сейчас недоступен. Попробуйте позже.",
      connectedAccounts: "Привязанные аккаунты",
      connectedAccountsDesc: "Привяжите аккаунт Google, чтобы входить через Google в следующий раз.",
      googleLinked: "Привязан",
      linkGoogle: "Привязать аккаунт Google",
      errRequired: "Обязательное поле.",
      errInvalidEmail: "Введите действительный адрес эл. почты.",
      errName: "Имя должно содержать от 2 до 80 символов.",
      errWeakPassword: "Используйте не менее 8 символов, включая букву и цифру.",
      errPasswordMismatch: "Пароли не совпадают.",
      errEmailTaken: "Аккаунт с этим адресом уже существует.",
      errInvalidCredentials: "Неверная эл. почта или пароль.",
      errWrongPassword: "Текущий пароль неверен.",
      errRateLimited: "Слишком много попыток. Подождите несколько минут и попробуйте снова.",
      errInvalidToken: "Эта ссылка недействительна или истекла.",
      errNotAuthenticated: "Войдите, чтобы продолжить.",
      errNetwork: "Не удалось связаться с сервером. Проверьте подключение и попробуйте снова.",
      errServer: "Что-то пошло не так. Попробуйте снова.",
    },

    nav: {
      home: "Главная",
      allTools: "Все инструменты",
      images: "Изображения",
      pdf: "PDF",
      convert: "Конвертировать",
      search: "Поиск",
      darkMode: "Тёмная тема",
      lightMode: "Светлая тема",
      more: "Ещё",

      language: "Язык",
      menu: "Меню",
      tools: "Инструменты",
      features: "Возможности",
      howItWorks: "Как это работает",
      faq: "Частые вопросы",
      getStarted: "Начать",    },

    common: {
      upload: "Загрузить",
      download: "Скачать",
      process: "Обработать",
      convert: "Конвертировать",
      compress: "Сжать",
      resize: "Изменить размер",
      edit: "Изменить",
      remove: "Удалить",
      clear: "Очистить",
      reset: "Сбросить",
      save: "Сохранить",
      cancel: "Отмена",
      copy: "Копировать",
      copied: "Скопировано",
      open: "Открыть",
      close: "Закрыть",
      back: "Назад",
      next: "Далее",
      previous: "Назад",
      selectFile: "Выбрать файл",
      selectFiles: "Выбрать файлы",
      chooseFile: "Выбрать файл",
      chooseFiles: "Выбрать файлы",
      dragDrop: "Перетащите файл сюда",
      or: "или",
      browse: "Обзор",
      loading: "Загрузка...",
      processing: "Обработка...",
      completed: "Готово",
      error: "Что-то пошло не так",
      tryAgain: "Попробовать снова",
      removeFile: "Удалить файл",
      downloadFile: "Скачать файл",
      downloadFiles: "Скачать файлы",
      searchTools: "Поиск инструментов...",
      noResults: "Результаты не найдены",
    },

    home: {
      heroTitle:
        "Всё необходимое для работы с вашими файлами.",
      heroDescription:
        "Конвертируйте, сжимайте, изменяйте размер, редактируйте и управляйте изображениями, PDF и обычными файлами с помощью простых онлайн-инструментов.",
      searchPlaceholder:
        "Поиск инструментов, PDF, изображений, сжатия, конвертации...",
      toolsLabel: "Инструменты",
      toolsTitle: "Найдите нужный инструмент.",
      toolsDescription:
        "Просматривайте коллекцию или ищите по задаче.",
      tool: "инструмент",
      tools: "инструменты",
      openTool: "Открыть инструмент",
      noToolsFound: "Инструменты не найдены",
      noToolsDescription:
        "Попробуйте другой поисковый запрос или выберите другую категорию.",
      clearSearch: "Очистить поиск",
      all: "Все",
      images: "Изображения",
      pdf: "PDF",
      convert: "Конвертировать",
      compress: "Сжать",
      productLabel: "ToolsGift",
      productTitle:
        "Полезные инструменты без лишней сложности.",
      productDescription:
        "ToolsGift объединяет инструменты для файлов, документов и повседневных задач в одном месте.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "Инструменты для изображений",
      organizePdf: "Организация PDF",
      optimizePdf: "Оптимизация PDF",
      convertToPdf: "Конвертация в PDF",
      convertFromPdf: "Конвертация из PDF",
      editPdf: "Редактирование PDF",
      pdfSecurity: "Безопасность PDF",
      pdfIntelligence: "Интеллект PDF",
      utilityOther: "Утилиты и другое",
    },

    footer: {
      about: "О нас",
      contact: "Контакты",
      privacy: "Конфиденциальность",
      terms: "Условия",
      cookies: "Файлы cookie",
      disclaimer: "Отказ от ответственности",
      copyright: "© ToolsGift. Все права защищены.",
    },

    messages: {
      fileTooLarge: "Файл слишком большой.",
      invalidFile: "Недопустимый файл.",
      unsupportedFormat: "Неподдерживаемый формат файла.",
      uploadFailed: "Не удалось загрузить файл.",
      processingFailed: "Не удалось обработать файл.",
      somethingWentWrong:
        "Что-то пошло не так. Попробуйте ещё раз.",
      noFileSelected:
        "Сначала выберите файл.",
      multipleFilesRequired:
        "Выберите несколько файлов.",
    },
  },

  ko: {
    languageName: "한국어",

    auth: {
      signIn: "로그인",
      signUp: "계정 만들기",
      signOut: "로그아웃",
      profile: "프로필",
      account: "계정",
      planFree: "무료 플랜",
      planPremium: "프리미엄 플랜",

      pleaseWait: "잠시 기다려주세요...",
      showPassword: "표시",
      hidePassword: "숨기기",

      name: "이름",
      namePlaceholder: "이름",
      email: "이메일",
      password: "비밀번호",
      confirmPassword: "비밀번호 확인",
      currentPassword: "현재 비밀번호",
      newPassword: "새 비밀번호",
      passwordHint: "영문과 숫자를 포함한 8자 이상입니다.",

      loginTitle: "다시 오신 것을 환영합니다",
      loginSubtitle: "ToolsGift 계정에 로그인하세요.",
      loginCta: "로그인",
      forgotPassword: "비밀번호를 잊으셨나요?",
      noAccount: "계정이 없으신가요?",
      createAccountCta: "만들기",

      signupTitle: "계정 만들기",
      signupSubtitle: "프로필과 설정을 관리할 무료 계정을 만드세요.",
      signupCta: "계정 만들기",
      haveAccount: "이미 계정이 있으신가요?",
      signInCta: "로그인",

      forgotTitle: "비밀번호 재설정",
      forgotSubtitle: "이메일 주소를 입력하시면 보안 재설정 링크를 보내드립니다.",
      sendResetLink: "링크 보내기",
      sentTitle: "받은 편지함을 확인하세요",
      sentSubtitle: "해당 주소로 계정이 있으면 재설정 링크를 보냈습니다. 링크는 15분 후 만료됩니다.",
      backToLogin: "로그인으로 돌아가기",

      resetTitle: "새 비밀번호 선택",
      resetSubtitle: "계정의 새 비밀번호를 입력하세요.",
      resetCta: "비밀번호 업데이트",
      updatedTitle: "비밀번호가 업데이트되었습니다",
      updatedSubtitle: "비밀번호가 변경되었습니다. 다른 모든 세션이 로그아웃되었습니다.",
      goToSignIn: "로그인으로 이동",
      invalidLinkTitle: "이 링크는 더 이상 유효하지 않습니다",
      invalidLinkSubtitle: "재설정 링크는 15분 후 만료됩니다. 새 링크를 요청한 후 다시 시도하세요.",

      memberSince: "가입일",
      personalInfo: "개인 정보",
      personalInfoDesc: "이름은 ToolsGift 계정 전체에 표시됩니다.",
      security: "보안",
      securityDesc: "비밀번호를 변경합니다. 변경하면 다른 모든 기기에서 로그아웃됩니다.",
      saveChanges: "변경 사항 저장",
      changesSaved: "변경 사항이 저장되었습니다",
      changePasswordCta: "비밀번호 변경",
      passwordChanged: "비밀번호가 변경되었습니다",
      sessions: "세션",
      sessionsDesc: "이 기기에서 로그인되어 있습니다. 모두 로그아웃하면 이 세션을 포함한 모든 세션이 종료됩니다.",
      signOutEverywhere: "모두 로그아웃",

      continueWithGoogle: "Google로 계속",
      googleDivider: "또는",
      errGoogleCancelled: "Google 로그인이 취소되었습니다. 다시 시도해 주세요.",
      errGoogleFailed: "Google로 로그인하는 중 문제가 발생했습니다. 다시 시도해 주세요.",
      errGoogleEmailTaken: "이 Google 계정은 아직 ToolsGift 계정과 연결되어 있지 않습니다. 먼저 비밀번호로 로그인한 다음 프로필에서 연결하세요.",
      errGoogleNotConfigured: "현재 Google 로그인을 사용할 수 없습니다. 잠시 후 다시 시도해 주세요.",
      connectedAccounts: "연결된 계정",
      connectedAccountsDesc: "다음에 Google로 로그인할 수 있도록 Google 계정을 연결하세요.",
      googleLinked: "연결됨",
      linkGoogle: "Google 계정 연결",
      errRequired: "필수 항목입니다.",
      errInvalidEmail: "올바른 이메일 주소를 입력하세요.",
      errName: "이름은 2자에서 80자 사이여야 합니다.",
      errWeakPassword: "영문과 숫자를 포함한 8자 이상을 사용하세요.",
      errPasswordMismatch: "비밀번호가 일치하지 않습니다.",
      errEmailTaken: "이미 이 이메일의 계정이 있습니다.",
      errInvalidCredentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
      errWrongPassword: "현재 비밀번호가 올바르지 않습니다.",
      errRateLimited: "시도 횟수가 너무 많습니다. 몇 분 후 다시 시도하세요.",
      errInvalidToken: "이 링크가 유효하지 않거나 만료되었습니다.",
      errNotAuthenticated: "계속하려면 로그인하세요.",
      errNetwork: "서버에 연결할 수 없습니다. 연결을 확인한 후 다시 시도하세요.",
      errServer: "문제가 발생했습니다. 다시 시도해 주세요.",
    },

    nav: {
      home: "홈",
      allTools: "모든 도구",
      images: "이미지",
      pdf: "PDF",
      convert: "변환",
      search: "검색",
      darkMode: "다크 모드",
      lightMode: "라이트 모드",
      more: "더보기",

      language: "언어",
      menu: "메뉴",
      tools: "도구",
      features: "기능",
      howItWorks: "사용 방법",
      faq: "자주 묻는 질문",
      getStarted: "시작하기",    },

    common: {
      upload: "업로드",
      download: "다운로드",
      process: "처리",
      convert: "변환",
      compress: "압축",
      resize: "크기 조정",
      edit: "편집",
      remove: "삭제",
      clear: "지우기",
      reset: "초기화",
      save: "저장",
      cancel: "취소",
      copy: "복사",
      copied: "복사됨",
      open: "열기",
      close: "닫기",
      back: "뒤로",
      next: "다음",
      previous: "이전",
      selectFile: "파일 선택",
      selectFiles: "파일 선택",
      chooseFile: "파일 선택",
      chooseFiles: "파일 선택",
      dragDrop: "파일을 여기에 끌어다 놓으세요",
      or: "또는",
      browse: "찾아보기",
      loading: "로드 중...",
      processing: "처리 중...",
      completed: "완료",
      error: "문제가 발생했습니다",
      tryAgain: "다시 시도",
      removeFile: "파일 삭제",
      downloadFile: "파일 다운로드",
      downloadFiles: "파일 다운로드",
      searchTools: "도구 검색...",
      noResults: "결과가 없습니다",
    },

    home: {
      heroTitle: "파일 작업에 필요한 모든 것이 있습니다.",
      heroDescription:
        "간단한 온라인 도구로 이미지, PDF 및 일상적인 파일을 변환, 압축, 크기 조정, 편집하고 관리하세요.",
      searchPlaceholder:
        "도구, PDF, 이미지, 압축, 변환 검색...",
      toolsLabel: "도구",
      toolsTitle: "필요한 도구를 찾아보세요.",
      toolsDescription:
        "도구를 둘러보거나 원하는 작업으로 검색하세요.",
      tool: "도구",
      tools: "도구",
      openTool: "도구 열기",
      noToolsFound: "도구를 찾을 수 없습니다",
      noToolsDescription:
        "다른 검색어를 사용하거나 다른 카테고리를 선택하세요.",
      clearSearch: "검색 지우기",
      all: "전체",
      images: "이미지",
      pdf: "PDF",
      convert: "변환",
      compress: "압축",
      productLabel: "ToolsGift",
      productTitle: "불필요한 복잡함 없는 유용한 도구.",
      productDescription:
        "ToolsGift는 파일, 문서 및 일상적인 작업을 위한 도구를 한곳에 모았습니다.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "이미지 도구",
      organizePdf: "PDF 정리",
      optimizePdf: "PDF 최적화",
      convertToPdf: "PDF로 변환",
      convertFromPdf: "PDF에서 변환",
      editPdf: "PDF 편집",
      pdfSecurity: "PDF 보안",
      pdfIntelligence: "PDF 인텔리전스",
      utilityOther: "유틸리티 및 기타",
    },

    footer: {
      about: "소개",
      contact: "문의",
      privacy: "개인정보 보호",
      terms: "약관",
      cookies: "쿠키",
      disclaimer: "면책 조항",
      copyright: "© ToolsGift. 모든 권리 보유.",
    },

    messages: {
      fileTooLarge: "파일이 너무 큽니다.",
      invalidFile: "잘못된 파일입니다.",
      unsupportedFormat: "지원되지 않는 파일 형식입니다.",
      uploadFailed: "업로드에 실패했습니다.",
      processingFailed: "처리에 실패했습니다.",
      somethingWentWrong:
        "문제가 발생했습니다. 다시 시도해주세요.",
      noFileSelected: "먼저 파일을 선택해주세요.",
      multipleFilesRequired:
        "여러 파일을 선택해주세요.",
    },
  },

  "zh-cn": {
    languageName: "中文 (简体)",

    auth: {
      signIn: "登录",
      signUp: "创建账户",
      signOut: "退出登录",
      profile: "个人资料",
      account: "账户",
      planFree: "免费计划",
      planPremium: "高级计划",

      pleaseWait: "请稍候...",
      showPassword: "显示",
      hidePassword: "隐藏",

      name: "姓名",
      namePlaceholder: "您的姓名",
      email: "邮箱",
      password: "密码",
      confirmPassword: "确认密码",
      currentPassword: "当前密码",
      newPassword: "新密码",
      passwordHint: "至少8个字符，包含字母和数字。",

      loginTitle: "欢迎回来",
      loginSubtitle: "登录您的 ToolsGift 账户。",
      loginCta: "登录",
      forgotPassword: "忘记密码？",
      noAccount: "还没有账户？",
      createAccountCta: "立即创建",

      signupTitle: "创建您的账户",
      signupSubtitle: "创建免费账户，管理您的资料和设置。",
      signupCta: "创建账户",
      haveAccount: "已有账户？",
      signInCta: "登录",

      forgotTitle: "重置密码",
      forgotSubtitle: "输入您的邮箱地址，我们将发送安全的重置链接。",
      sendResetLink: "发送重置链接",
      sentTitle: "请查收邮件",
      sentSubtitle: "如果该地址存在账户，重置链接已发送。链接15分钟后失效。",
      backToLogin: "返回登录",

      resetTitle: "选择新密码",
      resetSubtitle: "为您的账户输入新密码。",
      resetCta: "更新密码",
      updatedTitle: "密码已更新",
      updatedSubtitle: "您的密码已更改，其他所有会话均已退出。",
      goToSignIn: "继续登录",
      invalidLinkTitle: "此链接已失效",
      invalidLinkSubtitle: "重置链接15分钟后过期，请重新申请后再试。",

      memberSince: "注册于",
      personalInfo: "个人信息",
      personalInfoDesc: "您的姓名将显示在整个 ToolsGift 账户中。",
      security: "安全",
      securityDesc: "更改密码。更改后，您将在其他所有设备上退出登录。",
      saveChanges: "保存更改",
      changesSaved: "更改已保存",
      changePasswordCta: "更改密码",
      passwordChanged: "密码已更改",
      sessions: "会话",
      sessionsDesc: "您已在本设备登录。在所有设备退出将结束所有会话，包括当前会话。",
      signOutEverywhere: "退出所有设备",

      continueWithGoogle: "使用 Google 继续",
      googleDivider: "或",
      errGoogleCancelled: "Google 登录已取消。请重试。",
      errGoogleFailed: "使用 Google 登录时出现问题。请重试。",
      errGoogleEmailTaken: "该 Google 账号尚未关联到您的 ToolsGift 账号。请先使用密码登录，然后在个人资料中关联。",
      errGoogleNotConfigured: "目前无法使用 Google 登录。请稍后重试。",
      connectedAccounts: "已关联的账号",
      connectedAccountsDesc: "关联 Google 账号，下次即可使用 Google 登录。",
      googleLinked: "已关联",
      linkGoogle: "关联 Google 账号",
      errRequired: "此字段为必填项。",
      errInvalidEmail: "请输入有效的邮箱地址。",
      errName: "姓名长度需在2到80个字符之间。",
      errWeakPassword: "请使用至少8个字符，包含字母和数字。",
      errPasswordMismatch: "两次输入的密码不一致。",
      errEmailTaken: "该邮箱已被注册。",
      errInvalidCredentials: "邮箱或密码不正确。",
      errWrongPassword: "当前密码不正确。",
      errRateLimited: "尝试次数过多，请稍候几分钟再试。",
      errInvalidToken: "此重置链接无效或已过期。",
      errNotAuthenticated: "请登录后继续。",
      errNetwork: "无法连接服务器，请检查网络后重试。",
      errServer: "出了点问题，请重试。",
    },

    nav: {
      home: "首页",
      allTools: "所有工具",
      images: "图片",
      pdf: "PDF",
      convert: "转换",
      search: "搜索",
      darkMode: "深色模式",
      lightMode: "浅色模式",
      more: "更多",

      language: "语言",
      menu: "菜单",
      tools: "工具",
      features: "功能",
      howItWorks: "使用方法",
      faq: "常见问题",
      getStarted: "开始使用",    },

    common: {
      upload: "上传",
      download: "下载",
      process: "处理",
      convert: "转换",
      compress: "压缩",
      resize: "调整大小",
      edit: "编辑",
      remove: "删除",
      clear: "清除",
      reset: "重置",
      save: "保存",
      cancel: "取消",
      copy: "复制",
      copied: "已复制",
      open: "打开",
      close: "关闭",
      back: "返回",
      next: "下一步",
      previous: "上一步",
      selectFile: "选择文件",
      selectFiles: "选择文件",
      chooseFile: "选择文件",
      chooseFiles: "选择文件",
      dragDrop: "将文件拖放到这里",
      or: "或",
      browse: "浏览",
      loading: "加载中...",
      processing: "处理中...",
      completed: "已完成",
      error: "出现错误",
      tryAgain: "重试",
      removeFile: "删除文件",
      downloadFile: "下载文件",
      downloadFiles: "下载文件",
      searchTools: "搜索工具...",
      noResults: "未找到结果",
    },

    home: {
      heroTitle: "处理文件所需的一切工具。",
      heroDescription:
        "使用简单的在线工具转换、压缩、调整大小、编辑和管理图片、PDF及日常文件。",
      searchPlaceholder: "搜索工具、PDF、图片、压缩、转换...",
      toolsLabel: "工具",
      toolsTitle: "找到你需要的工具。",
      toolsDescription: "浏览工具集合，或根据任务进行搜索。",
      tool: "工具",
      tools: "工具",
      openTool: "打开工具",
      noToolsFound: "未找到工具",
      noToolsDescription:
        "尝试其他搜索词或选择其他类别。",
      clearSearch: "清除搜索",
      all: "全部",
      images: "图片",
      pdf: "PDF",
      convert: "转换",
      compress: "压缩",
      productLabel: "ToolsGift",
      productTitle: "实用工具，无需不必要的复杂操作。",
      productDescription:
        "ToolsGift 将文件、文档和日常实用工具集中在一个地方。",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "图片工具",
      organizePdf: "整理 PDF",
      optimizePdf: "优化 PDF",
      convertToPdf: "转换为 PDF",
      convertFromPdf: "从 PDF 转换",
      editPdf: "编辑 PDF",
      pdfSecurity: "PDF 安全",
      pdfIntelligence: "PDF 智能工具",
      utilityOther: "实用工具及其他",
    },

    footer: {
      about: "关于",
      contact: "联系我们",
      privacy: "隐私",
      terms: "条款",
      cookies: "Cookie",
      disclaimer: "免责声明",
      copyright: "© ToolsGift。保留所有权利。",
    },

    messages: {
      fileTooLarge: "文件太大。",
      invalidFile: "无效文件。",
      unsupportedFormat: "不支持的文件格式。",
      uploadFailed: "上传失败。",
      processingFailed: "处理失败。",
      somethingWentWrong: "出现问题，请重试。",
      noFileSelected: "请先选择文件。",
      multipleFilesRequired: "请选择多个文件。",
    },
  },

  "zh-tw": {
    languageName: "中文 (繁體)",

    auth: {
      signIn: "登入",
      signUp: "建立帳戶",
      signOut: "登出",
      profile: "個人資料",
      account: "帳戶",
      planFree: "免費方案",
      planPremium: "進階方案",

      pleaseWait: "請稍候...",
      showPassword: "顯示",
      hidePassword: "隱藏",

      name: "姓名",
      namePlaceholder: "您的姓名",
      email: "電子郵件",
      password: "密碼",
      confirmPassword: "確認密碼",
      currentPassword: "目前密碼",
      newPassword: "新密碼",
      passwordHint: "至少8個字元，包含字母和數字。",

      loginTitle: "歡迎回來",
      loginSubtitle: "登入您的 ToolsGift 帳戶。",
      loginCta: "登入",
      forgotPassword: "忘記密碼？",
      noAccount: "還沒有帳戶？",
      createAccountCta: "立即建立",

      signupTitle: "建立您的帳戶",
      signupSubtitle: "建立免費帳戶，管理您的資料與設定。",
      signupCta: "建立帳戶",
      haveAccount: "已有帳戶？",
      signInCta: "登入",

      forgotTitle: "重設密碼",
      forgotSubtitle: "輸入您的電子郵件地址，我們會傳送安全的重設連結。",
      sendResetLink: "傳送重設連結",
      sentTitle: "請查看收件匣",
      sentSubtitle: "若該地址存在帳戶，重設連結已傳送。連結將在15分鐘後失效。",
      backToLogin: "返回登入",

      resetTitle: "選擇新密碼",
      resetSubtitle: "為您的帳戶輸入新密碼。",
      resetCta: "更新密碼",
      updatedTitle: "密碼已更新",
      updatedSubtitle: "您的密碼已變更，其他所有工作階段皆已登出。",
      goToSignIn: "繼續登入",
      invalidLinkTitle: "此連結已失效",
      invalidLinkSubtitle: "重設連結會在15分鐘後過期，請重新申請後再試。",

      memberSince: "加入於",
      personalInfo: "個人資訊",
      personalInfoDesc: "您的姓名會顯示在整個 ToolsGift 帳戶中。",
      security: "安全性",
      securityDesc: "變更密碼。變更後，您會在所有其他裝置上登出。",
      saveChanges: "儲存變更",
      changesSaved: "變更已儲存",
      changePasswordCta: "變更密碼",
      passwordChanged: "密碼已變更",
      sessions: "工作階段",
      sessionsDesc: "您已在此裝置登入。在所有裝置登出會結束所有工作階段，包括這一個。",
      signOutEverywhere: "在所有裝置登出",

      continueWithGoogle: "使用 Google 繼續",
      googleDivider: "或",
      errGoogleCancelled: "Google 登入已取消。請再試一次。",
      errGoogleFailed: "使用 Google 登入時發生問題。請再試一次。",
      errGoogleEmailTaken: "這個 Google 帳號尚未連結至您的 ToolsGift 帳號。請先以密碼登入，再從個人檔案連結。",
      errGoogleNotConfigured: "目前無法使用 Google 登入。請稍後再試一次。",
      connectedAccounts: "已連結的帳號",
      connectedAccountsDesc: "連結 Google 帳號，下次即可使用 Google 登入。",
      googleLinked: "已連結",
      linkGoogle: "連結 Google 帳號",
      errRequired: "此欄位為必填。",
      errInvalidEmail: "請輸入有效的電子郵件地址。",
      errName: "姓名長度需介於2到80個字元。",
      errWeakPassword: "請使用至少8個字元，包含字母和數字。",
      errPasswordMismatch: "兩次輸入的密碼不一致。",
      errEmailTaken: "此電子郵件已被註冊。",
      errInvalidCredentials: "電子郵件或密碼不正確。",
      errWrongPassword: "目前密碼不正確。",
      errRateLimited: "嘗試次數過多，請稍候幾分鐘再試。",
      errInvalidToken: "此重設連結無效或已過期。",
      errNotAuthenticated: "請登入後繼續。",
      errNetwork: "無法連線至伺服器，請檢查連線後重試。",
      errServer: "發生問題，請再試一次。",
    },

    nav: {
      home: "首頁",
      allTools: "所有工具",
      images: "圖片",
      pdf: "PDF",
      convert: "轉換",
      search: "搜尋",
      darkMode: "深色模式",
      lightMode: "淺色模式",
      more: "更多",

      language: "語言",
      menu: "選單",
      tools: "工具",
      features: "功能",
      howItWorks: "使用方式",
      faq: "常見問題",
      getStarted: "開始使用",    },

    common: {
      upload: "上傳",
      download: "下載",
      process: "處理",
      convert: "轉換",
      compress: "壓縮",
      resize: "調整大小",
      edit: "編輯",
      remove: "移除",
      clear: "清除",
      reset: "重設",
      save: "儲存",
      cancel: "取消",
      copy: "複製",
      copied: "已複製",
      open: "開啟",
      close: "關閉",
      back: "返回",
      next: "下一步",
      previous: "上一步",
      selectFile: "選擇檔案",
      selectFiles: "選擇檔案",
      chooseFile: "選擇檔案",
      chooseFiles: "選擇檔案",
      dragDrop: "將檔案拖放到這裡",
      or: "或",
      browse: "瀏覽",
      loading: "載入中...",
      processing: "處理中...",
      completed: "已完成",
      error: "發生錯誤",
      tryAgain: "再試一次",
      removeFile: "移除檔案",
      downloadFile: "下載檔案",
      downloadFiles: "下載檔案",
      searchTools: "搜尋工具...",
      noResults: "找不到結果",
    },

    home: {
      heroTitle: "處理檔案所需的一切工具。",
      heroDescription:
        "使用簡單的線上工具轉換、壓縮、調整大小、編輯和管理圖片、PDF 及日常檔案。",
      searchPlaceholder: "搜尋工具、PDF、圖片、壓縮、轉換...",
      toolsLabel: "工具",
      toolsTitle: "找到你需要的工具。",
      toolsDescription: "瀏覽工具集合，或依照任務進行搜尋。",
      tool: "工具",
      tools: "工具",
      openTool: "開啟工具",
      noToolsFound: "找不到工具",
      noToolsDescription:
        "嘗試其他搜尋詞或選擇其他分類。",
      clearSearch: "清除搜尋",
      all: "全部",
      images: "圖片",
      pdf: "PDF",
      convert: "轉換",
      compress: "壓縮",
      productLabel: "ToolsGift",
      productTitle: "實用工具，沒有不必要的複雜操作。",
      productDescription:
        "ToolsGift 將檔案、文件和日常實用工具集中在一個地方。",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "圖片工具",
      organizePdf: "整理 PDF",
      optimizePdf: "最佳化 PDF",
      convertToPdf: "轉換為 PDF",
      convertFromPdf: "從 PDF 轉換",
      editPdf: "編輯 PDF",
      pdfSecurity: "PDF 安全",
      pdfIntelligence: "PDF 智慧工具",
      utilityOther: "實用工具及其他",
    },

    footer: {
      about: "關於",
      contact: "聯絡我們",
      privacy: "隱私",
      terms: "條款",
      cookies: "Cookie",
      disclaimer: "免責聲明",
      copyright: "© ToolsGift。保留所有權利。",
    },

    messages: {
      fileTooLarge: "檔案太大。",
      invalidFile: "無效檔案。",
      unsupportedFormat: "不支援的檔案格式。",
      uploadFailed: "上傳失敗。",
      processingFailed: "處理失敗。",
      somethingWentWrong: "發生問題，請再試一次。",
      noFileSelected: "請先選擇檔案。",
      multipleFilesRequired: "請選擇多個檔案。",
    },
  },

  ar: {
    languageName: "العربية",

    auth: {
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      signOut: "تسجيل الخروج",
      profile: "الملف الشخصي",
      account: "الحساب",
      planFree: "الخطة المجانية",
      planPremium: "الخطة المميزة",

      pleaseWait: "يرجى الانتظار...",
      showPassword: "إظهار",
      hidePassword: "إخفاء",

      name: "الاسم",
      namePlaceholder: "اسمك",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      passwordHint: "8 أحرف على الأقل، تتضمن حرفاً ورقماً.",

      loginTitle: "مرحباً بعودتك",
      loginSubtitle: "سجّل الدخول إلى حسابك في ToolsGift.",
      loginCta: "تسجيل الدخول",
      forgotPassword: "نسيت كلمة المرور؟",
      noAccount: "ليس لديك حساب؟",
      createAccountCta: "أنشئ واحداً",

      signupTitle: "أنشئ حسابك",
      signupSubtitle: "أنشئ حساباً مجانياً لإدارة ملفك الشخصي وإعداداتك.",
      signupCta: "إنشاء حساب",
      haveAccount: "لديك حساب بالفعل؟",
      signInCta: "تسجيل الدخول",

      forgotTitle: "إعادة تعيين كلمة المرور",
      forgotSubtitle: "أدخل بريدك الإلكتروني وسنرسل لك رابطاً آمناً لإعادة التعيين.",
      sendResetLink: "إرسال الرابط",
      sentTitle: "تحقق من بريدك الوارد",
      sentSubtitle: "إذا كان هناك حساب بهذا العنوان، فإن الرابط في الطريق إليه. تنتهي صلاحيته بعد 15 دقيقة.",
      backToLogin: "العودة لتسجيل الدخول",

      resetTitle: "اختر كلمة مرور جديدة",
      resetSubtitle: "أدخل كلمة مرور جديدة لحسابك.",
      resetCta: "تحديث كلمة المرور",
      updatedTitle: "تم تحديث كلمة المرور",
      updatedSubtitle: "تم تغيير كلمة مرورك، وتم تسجيل الخروج من كل الجلسات الأخرى.",
      goToSignIn: "المتابعة لتسجيل الدخول",
      invalidLinkTitle: "لم يعد هذا الرابط صالحاً",
      invalidLinkSubtitle: "تنتهي صلاحية روابط إعادة التعيين بعد 15 دقيقة. اطلب رابطاً جديداً وحاول مجدداً.",

      memberSince: "عضو منذ",
      personalInfo: "المعلومات الشخصية",
      personalInfoDesc: "يظهر اسمك في جميع أنحاء حسابك في ToolsGift.",
      security: "الأمان",
      securityDesc: "غيّر كلمة مرورك. عند تغييرها، سيتم تسجيل خروجك من كل الأجهزة الأخرى.",
      saveChanges: "حفظ التغييرات",
      changesSaved: "تم حفظ التغييرات",
      changePasswordCta: "تغيير كلمة المرور",
      passwordChanged: "تم تغيير كلمة المرور",
      sessions: "الجلسات",
      sessionsDesc: "أنت مسجّل الدخول على هذا الجهاز. تسجيل الخروج من كل مكان ينهي جميع الجلسات، بما في ذلك هذه الجلسة.",
      signOutEverywhere: "تسجيل الخروج من كل مكان",

      continueWithGoogle: "المتابعة عبر Google",
      googleDivider: "أو",
      errGoogleCancelled: "تم إلغاء تسجيل الدخول عبر Google. يرجى المحاولة مرة أخرى.",
      errGoogleFailed: "حدث خطأ أثناء تسجيل الدخول عبر Google. يرجى المحاولة مرة أخرى.",
      errGoogleEmailTaken: "حساب Google هذا غير مرتبط بحساب ToolsGift الخاص بك بعد. سجّل الدخول بكلمة المرور أولاً، ثم اربطه من ملفك الشخصي.",
      errGoogleNotConfigured: "تسجيل الدخول عبر Google غير متاح حاليًا. يرجى المحاولة لاحقًا.",
      connectedAccounts: "الحسابات المرتبطة",
      connectedAccountsDesc: "اربط حساب Google لتسجيل الدخول عبر Google في المرة القادمة.",
      googleLinked: "مرتبط",
      linkGoogle: "ربط حساب Google",
      errRequired: "هذا الحقل مطلوب.",
      errInvalidEmail: "أدخل بريداً إلكترونياً صالحاً.",
      errName: "يجب أن يتكون الاسم من 2 إلى 80 حرفاً.",
      errWeakPassword: "استخدم 8 أحرف على الأقل تتضمن حرفاً ورقماً.",
      errPasswordMismatch: "كلمتا المرور غير متطابقتين.",
      errEmailTaken: "يوجد حساب بالفعل بهذا البريد الإلكتروني.",
      errInvalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      errWrongPassword: "كلمة المرور الحالية غير صحيحة.",
      errRateLimited: "محاولات كثيرة جداً. انتظر بضع دقائق وحاول مجدداً.",
      errInvalidToken: "هذا الرابط غير صالح أو منتهي الصلاحية.",
      errNotAuthenticated: "سجّل الدخول للمتابعة.",
      errNetwork: "تعذّر الوصول إلى الخادم. تحقق من اتصالك وحاول مجدداً.",
      errServer: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    },

    nav: {
      home: "الرئيسية",
      allTools: "كل الأدوات",
      images: "الصور",
      pdf: "PDF",
      convert: "تحويل",
      search: "بحث",
      darkMode: "الوضع الداكن",
      lightMode: "الوضع الفاتح",
      more: "المزيد",

      language: "اللغة",
      menu: "القائمة",
      tools: "الأدوات",
      features: "الميزات",
      howItWorks: "كيفية الاستخدام",
      faq: "الأسئلة الشائعة",
      getStarted: "البدء",    },

    common: {
      upload: "رفع",
      download: "تنزيل",
      process: "معالجة",
      convert: "تحويل",
      compress: "ضغط",
      resize: "تغيير الحجم",
      edit: "تعديل",
      remove: "إزالة",
      clear: "مسح",
      reset: "إعادة ضبط",
      save: "حفظ",
      cancel: "إلغاء",
      copy: "نسخ",
      copied: "تم النسخ",
      open: "فتح",
      close: "إغلاق",
      back: "رجوع",
      next: "التالي",
      previous: "السابق",
      selectFile: "اختر ملفًا",
      selectFiles: "اختر ملفات",
      chooseFile: "اختيار ملف",
      chooseFiles: "اختيار ملفات",
      dragDrop: "اسحب ملفك وأفلته هنا",
      or: "أو",
      browse: "تصفح",
      loading: "جارٍ التحميل...",
      processing: "جارٍ المعالجة...",
      completed: "اكتمل",
      error: "حدث خطأ ما",
      tryAgain: "حاول مرة أخرى",
      removeFile: "إزالة الملف",
      downloadFile: "تنزيل الملف",
      downloadFiles: "تنزيل الملفات",
      searchTools: "البحث عن الأدوات...",
      noResults: "لم يتم العثور على نتائج",
    },

    home: {
      heroTitle: "كل ما تحتاجه للعمل مع ملفاتك.",
      heroDescription:
        "حوّل واضغط وغيّر حجم وعدّل وأدر الصور وملفات PDF والملفات اليومية باستخدام أدوات بسيطة عبر الإنترنت.",
      searchPlaceholder:
        "ابحث عن الأدوات أو PDF أو الصور أو الضغط أو التحويل...",
      toolsLabel: "الأدوات",
      toolsTitle: "اعثر على الأداة التي تحتاجها.",
      toolsDescription:
        "تصفح المجموعة أو ابحث حسب ما تريد القيام به.",
      tool: "أداة",
      tools: "أدوات",
      openTool: "فتح الأداة",
      noToolsFound: "لم يتم العثور على أدوات",
      noToolsDescription:
        "جرّب كلمة بحث أخرى أو اختر فئة أخرى.",
      clearSearch: "مسح البحث",
      all: "الكل",
      images: "الصور",
      pdf: "PDF",
      convert: "تحويل",
      compress: "ضغط",
      productLabel: "ToolsGift",
      productTitle: "أدوات مفيدة بدون تعقيد غير ضروري.",
      productDescription:
        "يجمع ToolsGift أدوات الملفات والمستندات والأدوات اليومية في مكان واحد.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "أدوات الصور",
      organizePdf: "تنظيم PDF",
      optimizePdf: "تحسين PDF",
      convertToPdf: "التحويل إلى PDF",
      convertFromPdf: "التحويل من PDF",
      editPdf: "تعديل PDF",
      pdfSecurity: "أمان PDF",
      pdfIntelligence: "ذكاء PDF",
      utilityOther: "أدوات مساعدة وأخرى",
    },

    footer: {
      about: "حول",
      contact: "اتصل بنا",
      privacy: "الخصوصية",
      terms: "الشروط",
      cookies: "ملفات تعريف الارتباط",
      disclaimer: "إخلاء المسؤولية",
      copyright: "© ToolsGift. جميع الحقوق محفوظة.",
    },

    messages: {
      fileTooLarge: "الملف كبير جدًا.",
      invalidFile: "ملف غير صالح.",
      unsupportedFormat: "تنسيق الملف غير مدعوم.",
      uploadFailed: "فشل رفع الملف.",
      processingFailed: "فشلت المعالجة.",
      somethingWentWrong:
        "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      noFileSelected: "يرجى اختيار ملف أولاً.",
      multipleFilesRequired:
        "يرجى اختيار عدة ملفات.",
    },
  },

  bg: {
    languageName: "Български",

    auth: {
      signIn: "Вход",
      signUp: "Създаване на акаунт",
      signOut: "Излизане",
      profile: "Профил",
      account: "Акаунт",
      planFree: "Безплатен план",
      planPremium: "Премиум план",

      pleaseWait: "Моля, изчакайте...",
      showPassword: "Показване",
      hidePassword: "Скриване",

      name: "Име",
      namePlaceholder: "Вашето име",
      email: "Имейл",
      password: "Парола",
      confirmPassword: "Потвърдете паролата",
      currentPassword: "Текуща парола",
      newPassword: "Нова парола",
      passwordHint: "Поне 8 знака, включващи буква и цифра.",

      loginTitle: "Добре дошли отново",
      loginSubtitle: "Влезте в своя акаунт в ToolsGift.",
      loginCta: "Вход",
      forgotPassword: "Забравена парола?",
      noAccount: "Нямате акаунт?",
      createAccountCta: "Създайте",

      signupTitle: "Създайте своя акаунт",
      signupSubtitle: "Създайте безплатен акаунт, за да управлявате профила и настройките си.",
      signupCta: "Създаване на акаунт",
      haveAccount: "Вече имате акаунт?",
      signInCta: "Вход",

      forgotTitle: "Нулиране на паролата",
      forgotSubtitle: "Въведете своя имейл адрес и ще ви изпратим сигурна връзка за нулиране.",
      sendResetLink: "Изпращане на връзка",
      sentTitle: "Проверете пощенската си кутия",
      sentSubtitle: "Ако за този адрес съществува акаунт, връзката е на път. Изтича след 15 минути.",
      backToLogin: "Обратно към входа",

      resetTitle: "Изберете нова парола",
      resetSubtitle: "Въведете нова парола за своя акаунт.",
      resetCta: "Актуализиране на паролата",
      updatedTitle: "Паролата е актуализирана",
      updatedSubtitle: "Паролата ви е променена. Всички други сесии бяха прекратени.",
      goToSignIn: "Продължете към входа",
      invalidLinkTitle: "Тази връзка вече не е валидна",
      invalidLinkSubtitle: "Връзките за нулиране изтичат след 15 минути. Поискайте нова и опитайте отново.",

      memberSince: "Член от",
      personalInfo: "Лична информация",
      personalInfoDesc: "Вашето име се показва в целия ви акаунт в ToolsGift.",
      security: "Сигурност",
      securityDesc: "Сменете паролата си. При промяната ще излезете от всички други устройства.",
      saveChanges: "Запазване на промените",
      changesSaved: "Промените са запазени",
      changePasswordCta: "Смяна на паролата",
      passwordChanged: "Паролата е сменена",
      sessions: "Сесии",
      sessionsDesc: "Влезли сте на това устройство. Излизането отвсякъде прекратява всички сесии, включително тази.",
      signOutEverywhere: "Излизане отвсякъде",

      continueWithGoogle: "Продължете с Google",
      googleDivider: "или",
      errGoogleCancelled: "Влизането чрез Google беше отменено. Опитайте отново.",
      errGoogleFailed: "Нещо се обърка при влизане чрез Google. Опитайте отново.",
      errGoogleEmailTaken: "Този Google акаунт все още не е свързан с вашия ToolsGift акаунт. Първо влезте с паролата си, след което го свържете от профила си.",
      errGoogleNotConfigured: "Влизането чрез Google не е налично в момента. Опитайте по-късно.",
      connectedAccounts: "Свързани акаунти",
      connectedAccountsDesc: "Свържете Google акаунта си, за да влизате с Google следващия път.",
      googleLinked: "Свързан",
      linkGoogle: "Свързване на Google акаунт",
      errRequired: "Това поле е задължително.",
      errInvalidEmail: "Въведете валиден имейл адрес.",
      errName: "Името трябва да е между 2 и 80 знака.",
      errWeakPassword: "Използвайте поне 8 знака с буква и цифра.",
      errPasswordMismatch: "Паролите не съвпадат.",
      errEmailTaken: "Вече съществува акаунт с този имейл адрес.",
      errInvalidCredentials: "Грешен имейл или парола.",
      errWrongPassword: "Текущата ви парола е грешна.",
      errRateLimited: "Твърде много опити. Изчакайте няколко минути и опитайте отново.",
      errInvalidToken: "Тази връзка е невалидна или е изтекла.",
      errNotAuthenticated: "Влезте, за да продължите.",
      errNetwork: "Сървърът е недостъпен. Проверете връзката си и опитайте отново.",
      errServer: "Нещо се обърка. Моля, опитайте отново.",
    },
    nav: {
      home: "Начало",
      allTools: "Всички инструменти",
      images: "Изображения",
      pdf: "PDF",
      convert: "Конвертиране",
      search: "Търсене",
      darkMode: "Тъмен режим",
      lightMode: "Светъл режим",
      more: "Още",

      language: "Език",
      menu: "Меню",
      tools: "Инструменти",
      features: "Функции",
      howItWorks: "Как работи",
      faq: "Често задавани въпроси",
      getStarted: "Започнете",    },
    common: {
      upload: "Качване",
      download: "Изтегляне",
      process: "Обработване",
      convert: "Конвертиране",
      compress: "Компресиране",
      resize: "Промяна на размера",
      edit: "Редактиране",
      remove: "Премахване",
      clear: "Изчистване",
      reset: "Нулиране",
      save: "Запазване",
      cancel: "Отказ",
      copy: "Копиране",
      copied: "Копирано",
      open: "Отваряне",
      close: "Затваряне",
      back: "Назад",
      next: "Напред",
      previous: "Предишен",
      selectFile: "Изберете файл",
      selectFiles: "Изберете файлове",
      chooseFile: "Изберете файл",
      chooseFiles: "Изберете файлове",
      dragDrop: "Плъзнете и пуснете файла тук",
      or: "или",
      browse: "Преглед",
      loading: "Зареждане...",
      processing: "Обработване...",
      completed: "Завършено",
      error: "Възникна грешка",
      tryAgain: "Опитайте отново",
      removeFile: "Премахване на файл",
      downloadFile: "Изтегляне на файл",
      downloadFiles: "Изтегляне на файлове",
      searchTools: "Търсене на инструменти...",
      noResults: "Няма намерени резултати",
    },
    home: {
      heroTitle: "Всичко необходимо за работа с вашите файлове.",
      heroDescription:
        "Конвертирайте, компресирайте, преоразмерявайте, редактирайте и управлявайте изображения, PDF и ежедневни файлове с лесни онлайн инструменти.",
      searchPlaceholder: "Търсене на инструменти, PDF, изображения...",
      toolsLabel: "Инструменти",
      toolsTitle: "Намерете инструмента, който ви трябва.",
      toolsDescription: "Разгледайте колекцията или търсете според задачата.",
      tool: "инструмент",
      tools: "инструменти",
      openTool: "Отвори инструмента",
      noToolsFound: "Няма намерени инструменти",
      noToolsDescription:
        "Опитайте друга дума за търсене или изберете друга категория.",
      clearSearch: "Изчисти търсенето",
      all: "Всички",
      images: "Изображения",
      pdf: "PDF",
      convert: "Конвертиране",
      compress: "Компресиране",
      productLabel: "ToolsGift",
      productTitle: "Полезни инструменти без излишна сложност.",
      productDescription:
        "ToolsGift обединява инструменти за файлове, документи и ежедневни задачи на едно място.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },
    categories: {
      imageTools: "Инструменти за изображения",
      organizePdf: "Организиране на PDF",
      optimizePdf: "Оптимизиране на PDF",
      convertToPdf: "Конвертиране към PDF",
      convertFromPdf: "Конвертиране от PDF",
      editPdf: "Редактиране на PDF",
      pdfSecurity: "PDF сигурност",
      pdfIntelligence: "PDF интелигентност",
      utilityOther: "Помощни и други",
    },
    footer: {
      about: "За нас",
      contact: "Контакти",
      privacy: "Поверителност",
      terms: "Условия",
      cookies: "Бисквитки",
      disclaimer: "Отказ от отговорност",
      copyright: "© ToolsGift. Всички права запазени.",
    },
    messages: {
      fileTooLarge: "Файлът е твърде голям.",
      invalidFile: "Невалиден файл.",
      unsupportedFormat: "Неподдържан файлов формат.",
      uploadFailed: "Качването не бе успешно.",
      processingFailed: "Обработката не бе успешна.",
      somethingWentWrong: "Нещо се обърка. Опитайте отново.",
      noFileSelected: "Моля, изберете файл първо.",
      multipleFilesRequired: "Моля, изберете няколко файла.",
    },
  },

  ca: {
    languageName: "Català",

    auth: {
      signIn: "Inicia sessió",
      signUp: "Crea un compte",
      signOut: "Tanca la sessió",
      profile: "Perfil",
      account: "Compte",
      planFree: "Pla gratuït",
      planPremium: "Pla premium",

      pleaseWait: "Espera...",
      showPassword: "Mostra",
      hidePassword: "Amaga",

      name: "Nom",
      namePlaceholder: "El teu nom",
      email: "Correu electrònic",
      password: "Contrasenya",
      confirmPassword: "Confirma la contrasenya",
      currentPassword: "Contrasenya actual",
      newPassword: "Contrasenya nova",
      passwordHint: "Almenys 8 caràcters, amb una lletra i un número.",

      loginTitle: "Benvingut de nou",
      loginSubtitle: "Inicia sessió al teu compte de ToolsGift.",
      loginCta: "Inicia sessió",
      forgotPassword: "Has oblidat la contrasenya?",
      noAccount: "No tens un compte?",
      createAccountCta: "Crea'n un",

      signupTitle: "Crea el teu compte",
      signupSubtitle: "Crea un compte gratuït per gestionar el teu perfil i la configuració.",
      signupCta: "Crea un compte",
      haveAccount: "Ja tens un compte?",
      signInCta: "Inicia sessió",

      forgotTitle: "Restableix la contrasenya",
      forgotSubtitle: "Introdueix el teu correu electrònic i t'enviarem un enllaç segur per restablir-la.",
      sendResetLink: "Envia l'enllaç",
      sentTitle: "Comprova la safata d'entrada",
      sentSubtitle: "Si existeix un compte amb aquesta adreça, l'enllaç ja és en camí. Caduca en 15 minuts.",
      backToLogin: "Torna a l'inici de sessió",

      resetTitle: "Tria una contrasenya nova",
      resetSubtitle: "Introdueix una contrasenya nova per al teu compte.",
      resetCta: "Actualitza la contrasenya",
      updatedTitle: "Contrasenya actualitzada",
      updatedSubtitle: "La teva contrasenya s'ha canviat. Totes les altres sessions s'han tancat.",
      goToSignIn: "Continua a l'inici de sessió",
      invalidLinkTitle: "Aquest enllaç ja no és vàlid",
      invalidLinkSubtitle: "Els enllaços caduquen als 15 minuts. Demana'n un de nou i torna-ho a provar.",

      memberSince: "Membre des del",
      personalInfo: "Informació personal",
      personalInfoDesc: "El teu nom es mostra a tot el teu compte de ToolsGift.",
      security: "Seguretat",
      securityDesc: "Canvia la contrasenya. En canviar-la, es tancarà la sessió a tots els altres dispositius.",
      saveChanges: "Desa els canvis",
      changesSaved: "S'han desat els canvis",
      changePasswordCta: "Canvia la contrasenya",
      passwordChanged: "Contrasenya canviada",
      sessions: "Sessions",
      sessionsDesc: "Has iniciat sessió en aquest dispositiu. Tanar la sessió a tot arreu acaba totes les sessions, inclosa aquesta.",
      signOutEverywhere: "Tanca la sessió a tot arreu",

      continueWithGoogle: "Continua amb Google",
      googleDivider: "o",
      errGoogleCancelled: "S'ha cancel·lat l'inici de sessió amb Google. Torna-ho a provar.",
      errGoogleFailed: "S'ha produït un error en iniciar sessió amb Google. Torna-ho a provar.",
      errGoogleEmailTaken: "Aquest compte de Google encara no està vinculat al teu compte de ToolsGift. Inicia sessió primer amb la contrasenya i després vincula'l des del teu perfil.",
      errGoogleNotConfigured: "En aquest moment, l'inici de sessió amb Google no està disponible. Torna-ho a provar més tard.",
      connectedAccounts: "Comptes vinculats",
      connectedAccountsDesc: "Vincula el teu compte de Google per iniciar sessió amb Google la pròxima vegada.",
      googleLinked: "Vinculat",
      linkGoogle: "Vincular el compte de Google",
      errRequired: "Aquest camp és obligatori.",
      errInvalidEmail: "Introdueix una adreça de correu electrònic vàlida.",
      errName: "El nom ha de tenir entre 2 i 80 caràcters.",
      errWeakPassword: "Fes servir almenys 8 caràcters amb una lletra i un número.",
      errPasswordMismatch: "Les contrasenyes no coincideixen.",
      errEmailTaken: "Ja existeix un compte amb aquesta adreça de correu.",
      errInvalidCredentials: "Correu o contrasenya incorrectes.",
      errWrongPassword: "La teva contrasenya actual és incorrecta.",
      errRateLimited: "Massa intents. Espera uns minuts i torna-ho a provar.",
      errInvalidToken: "Aquest enllaç no és vàlid o ha caducat.",
      errNotAuthenticated: "Inicia sessió per continuar.",
      errNetwork: "No s'ha pogut contactar amb el servidor. Comprova la connexió i torna-ho a provar.",
      errServer: "Algo ha anat malament. Torna-ho a provar.",
    },
    nav: {
      home: "Inici",
      allTools: "Totes les eines",
      images: "Imatges",
      pdf: "PDF",
      convert: "Convertir",
      search: "Cercar",
      darkMode: "Mode fosc",
      lightMode: "Mode clar",
      more: "Més",

      language: "Idioma",
      menu: "Menú",
      tools: "Eines",
      features: "Funcions",
      howItWorks: "Com funciona",
      faq: "Preguntes freqüents",
      getStarted: "Comença",    },
    common: {
      upload: "Pujar",
      download: "Descarregar",
      process: "Processar",
      convert: "Convertir",
      compress: "Comprimir",
      resize: "Canviar la mida",
      edit: "Editar",
      remove: "Eliminar",
      clear: "Netejar",
      reset: "Restablir",
      save: "Desar",
      cancel: "Cancel·lar",
      copy: "Copiar",
      copied: "Copiat",
      open: "Obrir",
      close: "Tancar",
      back: "Enrere",
      next: "Següent",
      previous: "Anterior",
      selectFile: "Selecciona un fitxer",
      selectFiles: "Selecciona fitxers",
      chooseFile: "Tria un fitxer",
      chooseFiles: "Tria fitxers",
      dragDrop: "Arrossega i deixa anar el fitxer aquí",
      or: "o",
      browse: "Navegar",
      loading: "Carregant...",
      processing: "Processant...",
      completed: "Completat",
      error: "Alguna cosa ha anat malament",
      tryAgain: "Torna-ho a provar",
      removeFile: "Eliminar fitxer",
      downloadFile: "Descarregar fitxer",
      downloadFiles: "Descarregar fitxers",
      searchTools: "Cercar eines...",
      noResults: "No s'han trobat resultats",
    },
    home: {
      heroTitle: "Tot el que necessites per treballar amb els teus fitxers.",
      heroDescription:
        "Converteix, comprimeix, redimensiona, edita i gestiona imatges, PDF i fitxers quotidians amb eines en línia senzilles.",
      searchPlaceholder: "Cerca eines, PDF, imatges, comprimir, convertir...",
      toolsLabel: "Eines",
      toolsTitle: "Troba l'eina que necessites.",
      toolsDescription:
        "Explora la col·lecció o cerca segons el que vulguis fer.",
      tool: "eina",
      tools: "eines",
      openTool: "Obrir eina",
      noToolsFound: "No s'han trobat eines",
      noToolsDescription:
        "Prova un altre terme de cerca o tria una altra categoria.",
      clearSearch: "Netejar cerca",
      all: "Totes",
      images: "Imatges",
      pdf: "PDF",
      convert: "Convertir",
      compress: "Comprimir",
      productLabel: "ToolsGift",
      productTitle: "Eines útils sense complexitat innecessària.",
      productDescription:
        "ToolsGift reuneix eines per a fitxers, documents i tasques quotidianes en un sol lloc.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },
    categories: {
      imageTools: "Eines d'imatge",
      organizePdf: "Organitzar PDF",
      optimizePdf: "Optimitzar PDF",
      convertToPdf: "Convertir a PDF",
      convertFromPdf: "Convertir des de PDF",
      editPdf: "Editar PDF",
      pdfSecurity: "Seguretat PDF",
      pdfIntelligence: "Intel·ligència PDF",
      utilityOther: "Utilitats i altres",
    },
    footer: {
      about: "Sobre nosaltres",
      contact: "Contacte",
      privacy: "Privadesa",
      terms: "Condicions",
      cookies: "Cookies",
      disclaimer: "Avís legal",
      copyright: "© ToolsGift. Tots els drets reservats.",
    },
    messages: {
      fileTooLarge: "El fitxer és massa gran.",
      invalidFile: "Fitxer no vàlid.",
      unsupportedFormat: "Format de fitxer no compatible.",
      uploadFailed: "La pujada ha fallat.",
      processingFailed: "El processament ha fallat.",
      somethingWentWrong: "Alguna cosa ha anat malament. Torna-ho a provar.",
      noFileSelected: "Selecciona primer un fitxer.",
      multipleFilesRequired: "Selecciona diversos fitxers.",
    },
  },

  nl: {
    languageName: "Nederlands",

    auth: {
      signIn: "Inloggen",
      signUp: "Account maken",
      signOut: "Uitloggen",
      profile: "Profiel",
      account: "Account",
      planFree: "Gratis plan",
      planPremium: "Premiumplan",

      pleaseWait: "Even geduld...",
      showPassword: "Tonen",
      hidePassword: "Verbergen",

      name: "Naam",
      namePlaceholder: "Je naam",
      email: "E-mail",
      password: "Wachtwoord",
      confirmPassword: "Wachtwoord bevestigen",
      currentPassword: "Huidig wachtwoord",
      newPassword: "Nieuw wachtwoord",
      passwordHint: "Minstens 8 tekens, met een letter en een cijfer.",

      loginTitle: "Welkom terug",
      loginSubtitle: "Log in op je ToolsGift-account.",
      loginCta: "Inloggen",
      forgotPassword: "Wachtwoord vergeten?",
      noAccount: "Geen account?",
      createAccountCta: "Maak er een",

      signupTitle: "Maak je account",
      signupSubtitle: "Maak een gratis account om je profiel en instellingen te beheren.",
      signupCta: "Account maken",
      haveAccount: "Al een account?",
      signInCta: "Inloggen",

      forgotTitle: "Wachtwoord opnieuw instellen",
      forgotSubtitle: "Vul je e-mailadres in en we sturen je een veilige herstellink.",
      sendResetLink: "Stuur link",
      sentTitle: "Controleer je inbox",
      sentSubtitle: "Als er een account bestaat met dat adres, is de link onderweg. De link verloopt over 15 minuten.",
      backToLogin: "Terug naar inloggen",

      resetTitle: "Kies een nieuw wachtwoord",
      resetSubtitle: "Vul een nieuw wachtwoord in voor je account.",
      resetCta: "Wachtwoord bijwerken",
      updatedTitle: "Wachtwoord bijgewerkt",
      updatedSubtitle: "Je wachtwoord is gewijzigd. Alle andere sessies zijn uitgelogd.",
      goToSignIn: "Verder naar inloggen",
      invalidLinkTitle: "Deze link is niet meer geldig",
      invalidLinkSubtitle: "Herstellinks verlopen na 15 minuten. Vraag een nieuwe aan en probeer het opnieuw.",

      memberSince: "Lid sinds",
      personalInfo: "Persoonlijke gegevens",
      personalInfoDesc: "Je naam wordt in je hele ToolsGift-account getoond.",
      security: "Beveiliging",
      securityDesc: "Wijzig je wachtwoord. Daarmee word je overal elders uitgelogd.",
      saveChanges: "Wijzigingen opslaan",
      changesSaved: "Wijzigingen opgeslagen",
      changePasswordCta: "Wachtwoord wijzigen",
      passwordChanged: "Wachtwoord gewijzigd",
      sessions: "Sessies",
      sessionsDesc: "Je bent ingelogd op dit apparaat. Overal uitloggen beëindigt alle sessies, ook deze.",
      signOutEverywhere: "Overal uitloggen",

      continueWithGoogle: "Doorgaan met Google",
      googleDivider: "of",
      errGoogleCancelled: "Aanmelden met Google is geannuleerd. Probeer het opnieuw.",
      errGoogleFailed: "Er is iets misgegaan bij het aanmelden met Google. Probeer het opnieuw.",
      errGoogleEmailTaken: "Dat Google-account is nog niet gekoppeld aan je ToolsGift-account. Log eerst in met je wachtwoord en koppel het daarna vanuit je profiel.",
      errGoogleNotConfigured: "Aanmelden met Google is momenteel niet beschikbaar. Probeer het later opnieuw.",
      connectedAccounts: "Gekoppelde accounts",
      connectedAccountsDesc: "Koppel je Google-account om de volgende keer met Google in te loggen.",
      googleLinked: "Gekoppeld",
      linkGoogle: "Google-account koppelen",
      errRequired: "Dit veld is verplicht.",
      errInvalidEmail: "Vul een geldig e-mailadres in.",
      errName: "De naam moet tussen 2 en 80 tekens bevatten.",
      errWeakPassword: "Gebruik minstens 8 tekens met een letter en een cijfer.",
      errPasswordMismatch: "De wachtwoorden komen niet overeen.",
      errEmailTaken: "Er bestaat al een account met dit e-mailadres.",
      errInvalidCredentials: "E-mail of wachtwoord is onjuist.",
      errWrongPassword: "Je huidige wachtwoord is onjuist.",
      errRateLimited: "Te veel pogingen. Wacht een paar minuten en probeer het opnieuw.",
      errInvalidToken: "Deze link is ongeldig of verlopen.",
      errNotAuthenticated: "Log in om verder te gaan.",
      errNetwork: "De server was niet bereikbaar. Controleer je verbinding en probeer het opnieuw.",
      errServer: "Er is iets misgegaan. Probeer het opnieuw.",
    },
    nav: {
      home: "Home",
      allTools: "Alle tools",
      images: "Afbeeldingen",
      pdf: "PDF",
      convert: "Converteren",
      search: "Zoeken",
      darkMode: "Donkere modus",
      lightMode: "Lichte modus",
      more: "Meer",

      language: "Taal",
      menu: "Menu",
      tools: "Hulpmiddelen",
      features: "Functies",
      howItWorks: "Hoe het werkt",
      faq: "Veelgestelde vragen",
      getStarted: "Aan de slag",    },
    common: {
      upload: "Uploaden",
      download: "Downloaden",
      process: "Verwerken",
      convert: "Converteren",
      compress: "Comprimeren",
      resize: "Formaat wijzigen",
      edit: "Bewerken",
      remove: "Verwijderen",
      clear: "Wissen",
      reset: "Resetten",
      save: "Opslaan",
      cancel: "Annuleren",
      copy: "Kopiëren",
      copied: "Gekopieerd",
      open: "Openen",
      close: "Sluiten",
      back: "Terug",
      next: "Volgende",
      previous: "Vorige",
      selectFile: "Bestand selecteren",
      selectFiles: "Bestanden selecteren",
      chooseFile: "Bestand kiezen",
      chooseFiles: "Bestanden kiezen",
      dragDrop: "Sleep je bestand hierheen",
      or: "of",
      browse: "Bladeren",
      loading: "Laden...",
      processing: "Verwerken...",
      completed: "Voltooid",
      error: "Er is iets misgegaan",
      tryAgain: "Opnieuw proberen",
      removeFile: "Bestand verwijderen",
      downloadFile: "Bestand downloaden",
      downloadFiles: "Bestanden downloaden",
      searchTools: "Tools zoeken...",
      noResults: "Geen resultaten gevonden",
    },
    home: {
      heroTitle: "Alles wat je nodig hebt om met je bestanden te werken.",
      heroDescription:
        "Converteer, comprimeer, wijzig het formaat, bewerk en beheer afbeeldingen, PDF's en dagelijkse bestanden met eenvoudige online tools.",
      searchPlaceholder: "Tools, PDF, afbeeldingen, comprimeren, converteren zoeken...",
      toolsLabel: "Tools",
      toolsTitle: "Vind de tool die je nodig hebt.",
      toolsDescription:
        "Bekijk de collectie of zoek op basis van wat je wilt doen.",
      tool: "tool",
      tools: "tools",
      openTool: "Tool openen",
      noToolsFound: "Geen tools gevonden",
      noToolsDescription:
        "Probeer een andere zoekterm of kies een andere categorie.",
      clearSearch: "Zoekopdracht wissen",
      all: "Alle",
      images: "Afbeeldingen",
      pdf: "PDF",
      convert: "Converteren",
      compress: "Comprimeren",
      productLabel: "ToolsGift",
      productTitle: "Handige tools zonder onnodige complexiteit.",
      productDescription:
        "ToolsGift brengt dagelijkse tools voor bestanden, documenten en hulpprogramma's samen op één plek.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },
    categories: {
      imageTools: "Afbeeldingstools",
      organizePdf: "PDF organiseren",
      optimizePdf: "PDF optimaliseren",
      convertToPdf: "Converteren naar PDF",
      convertFromPdf: "Converteren vanuit PDF",
      editPdf: "PDF bewerken",
      pdfSecurity: "PDF-beveiliging",
      pdfIntelligence: "PDF-intelligentie",
      utilityOther: "Hulpprogramma's en overige",
    },
    footer: {
      about: "Over ons",
      contact: "Contact",
      privacy: "Privacy",
      terms: "Voorwaarden",
      cookies: "Cookies",
      disclaimer: "Disclaimer",
      copyright: "© ToolsGift. Alle rechten voorbehouden.",
    },
    messages: {
      fileTooLarge: "Het bestand is te groot.",
      invalidFile: "Ongeldig bestand.",
      unsupportedFormat: "Niet-ondersteund bestandsformaat.",
      uploadFailed: "Upload mislukt.",
      processingFailed: "Verwerking mislukt.",
      somethingWentWrong: "Er is iets misgegaan. Probeer het opnieuw.",
      noFileSelected: "Selecteer eerst een bestand.",
      multipleFilesRequired: "Selecteer meerdere bestanden.",
    },
  },

  el: {
    languageName: "Ελληνικά",

    auth: {
      signIn: "Σύνδεση",
      signUp: "Δημιουργία λογαριασμού",
      signOut: "Αποσύνδεση",
      profile: "Προφίλ",
      account: "Λογαριασμός",
      planFree: "Δωρεάν πλάνο",
      planPremium: "Premium πλάνο",

      pleaseWait: "Περιμένετε...",
      showPassword: "Εμφάνιση",
      hidePassword: "Απόκρυψη",

      name: "Όνομα",
      namePlaceholder: "Το όνομά σας",
      email: "Ηλεκτρονικό ταχυδρομείο",
      password: "Κωδικός πρόσβασης",
      confirmPassword: "Επιβεβαίωση κωδικού",
      currentPassword: "Τρέχων κωδικός",
      newPassword: "Νέος κωδικός",
      passwordHint: "Τουλάχιστον 8 χαρακτήρες, με ένα γράμμα και ένα νούμερο.",

      loginTitle: "Καλώς ήρθατε ξανά",
      loginSubtitle: "Συνδεθείτε στον λογαριασμό σας στο ToolsGift.",
      loginCta: "Σύνδεση",
      forgotPassword: "Ξεχάσατε τον κωδικό σας;",
      noAccount: "Δεν έχετε λογαριασμό;",
      createAccountCta: "Δημιουργήστε έναν",

      signupTitle: "Δημιουργήστε τον λογαριασμό σας",
      signupSubtitle: "Δημιουργήστε έναν δωρεάν λογαριασμό για να διαχειριστείτε το προφίλ και τις ρυθμίσεις σας.",
      signupCta: "Δημιουργία λογαριασμού",
      haveAccount: "Έχετε ήδη λογαριασμό;",
      signInCta: "Σύνδεση",

      forgotTitle: "Επαναφορά κωδικού",
      forgotSubtitle: "Πληκτρολογήστε τη διεύθυνση email σας και θα σας στείλουμε ασφαλή σύνδεσμο επαναφοράς.",
      sendResetLink: "Αποστολή συνδέσμου",
      sentTitle: "Ελέγξτε τα εισερχόμενα",
      sentSubtitle: "Αν υπάρχει λογαριασμός με αυτή τη διεύθυνση, ο σύνδεσμος στέλνεται. Λήγει σε 15 λεπτά.",
      backToLogin: "Πίσω στη σύνδεση",

      resetTitle: "Επιλέξτε νέο κωδικό",
      resetSubtitle: "Πληκτρολογήστε έναν νέο κωδικό για τον λογαριασμό σας.",
      resetCta: "Ενημέρωση κωδικού",
      updatedTitle: "Ο κωδικός ενημερώθηκε",
      updatedSubtitle: "Ο κωδικός σας άλλαξε. Όλες οι άλλες συνεδρίες αποσυνδέθηκαν.",
      goToSignIn: "Συνέχεια στη σύνδεση",
      invalidLinkTitle: "Ο σύνδεσμος δεν είναι πλέον έγκυρος",
      invalidLinkSubtitle: "Οι σύνδεσμοι επαναφοράς λήγουν σε 15 λεπτά. Ζητήστε νέο και δοκιμάστε ξανά.",

      memberSince: "Μέλος από",
      personalInfo: "Προσωπικά στοιχεία",
      personalInfoDesc: "Το όνομά σας εμφανίζεται σε όλο τον λογαριασμό σας στο ToolsGift.",
      security: "Ασφάλεια",
      securityDesc: "Αλλάξτε τον κωδικό σας. Με την αλλαγή θα αποσυνδεθείτε από όλες τις άλλες συσκευές.",
      saveChanges: "Αποθήκευση αλλαγών",
      changesSaved: "Οι αλλαγές αποθηκεύτηκαν",
      changePasswordCta: "Αλλαγή κωδικού",
      passwordChanged: "Ο κωδικός άλλαξε",
      sessions: "Συνεδρίες",
      sessionsDesc: "Έχετε συνδεθεί σε αυτή τη συσκευή. Η αποσύνδεση παντού τερματίζει όλες τις συνεδρίες, συμπεριλαμβανομένης αυτής.",
      signOutEverywhere: "Αποσύνδεση παντού",

      continueWithGoogle: "Συνέχεια με Google",
      googleDivider: "ή",
      errGoogleCancelled: "Η σύνδεση με Google ακυρώθηκε. Δοκιμάστε ξανά.",
      errGoogleFailed: "Κάτι πήγε στραβά κατά τη σύνδεση με Google. Δοκιμάστε ξανά.",
      errGoogleEmailTaken: "Αυτός ο λογαριασμός Google δεν έχει συνδεθεί ακόμη με τον λογαριασμό ToolsGift σας. Συνδεθείτε πρώτα με τον κωδικό σας και μετά συνδέστε τον από το προφίλ σας.",
      errGoogleNotConfigured: "Η σύνδεση με Google δεν είναι διαθέσιμη αυτή τη στιγμή. Δοκιμάστε αργότερα.",
      connectedAccounts: "Συνδεδεμένοι λογαριασμοί",
      connectedAccountsDesc: "Συνδέστε τον λογαριασμό Google σας για να συνδέεστε με Google την επόμενη φορά.",
      googleLinked: "Συνδέθηκε",
      linkGoogle: "Σύνδεση λογαριασμού Google",
      errRequired: "Αυτό το πεδίο είναι υποχρεωτικό.",
      errInvalidEmail: "Πληκτρολογήστε μια έγκυρη διεύθυνση email.",
      errName: "Το όνομα πρέπει να έχει από 2 έως 80 χαρακτήρες.",
      errWeakPassword: "Χρησιμοποιήστε τουλάχιστον 8 χαρακτήρες με ένα γράμμα και ένα νούμερο.",
      errPasswordMismatch: "Οι κωδικοί δεν ταιριάζουν.",
      errEmailTaken: "Υπάρχει ήδη λογαριασμός με αυτό το email.",
      errInvalidCredentials: "Λάθος email ή κωδικός.",
      errWrongPassword: "Ο τρέχων κωδικός σας είναι λάθος.",
      errRateLimited: "Πολλές προσπάθειες. Περιμένετε λίγα λεπτά και δοκιμάστε ξανά.",
      errInvalidToken: "Αυτός ο σύνδεσμος δεν είναι έγκυρος ή έληξε.",
      errNotAuthenticated: "Συνδεθείτε για να συνεχίσετε.",
      errNetwork: "Δεν ήταν δυνατή η σύνδεση με τον διακομιστή. Ελέγξτε τη σύνδεσή σας και δοκιμάστε ξανά.",
      errServer: "Κάτι πήγε στραβά. Δοκιμάστε ξανά.",
    },
    nav: {
      home: "Αρχική",
      allTools: "Όλα τα εργαλεία",
      images: "Εικόνες",
      pdf: "PDF",
      convert: "Μετατροπή",
      search: "Αναζήτηση",
      darkMode: "Σκοτεινή λειτουργία",
      lightMode: "Φωτεινή λειτουργία",
      more: "Περισσότερα",

      language: "Γλώσσα",
      menu: "Μενού",
      tools: "Εργαλεία",
      features: "Δυνατότητες",
      howItWorks: "Πώς λειτουργεί",
      faq: "Συχνές ερωτήσεις",
      getStarted: "Ξεκινήστε",    },
    common: {
      upload: "Μεταφόρτωση",
      download: "Λήψη",
      process: "Επεξεργασία",
      convert: "Μετατροπή",
      compress: "Συμπίεση",
      resize: "Αλλαγή μεγέθους",
      edit: "Επεξεργασία",
      remove: "Αφαίρεση",
      clear: "Εκκαθάριση",
      reset: "Επαναφορά",
      save: "Αποθήκευση",
      cancel: "Ακύρωση",
      copy: "Αντιγραφή",
      copied: "Αντιγράφηκε",
      open: "Άνοιγμα",
      close: "Κλείσιμο",
      back: "Πίσω",
      next: "Επόμενο",
      previous: "Προηγούμενο",
      selectFile: "Επιλέξτε αρχείο",
      selectFiles: "Επιλέξτε αρχεία",
      chooseFile: "Επιλέξτε αρχείο",
      chooseFiles: "Επιλέξτε αρχεία",
      dragDrop: "Σύρετε και αποθέστε το αρχείο εδώ",
      or: "ή",
      browse: "Αναζήτηση",
      loading: "Φόρτωση...",
      processing: "Επεξεργασία...",
      completed: "Ολοκληρώθηκε",
      error: "Κάτι πήγε στραβά",
      tryAgain: "Δοκιμάστε ξανά",
      removeFile: "Αφαίρεση αρχείου",
      downloadFile: "Λήψη αρχείου",
      downloadFiles: "Λήψη αρχείων",
      searchTools: "Αναζήτηση εργαλείων...",
      noResults: "Δεν βρέθηκαν αποτελέσματα",
    },
    home: {
      heroTitle: "Όλα όσα χρειάζεστε για να εργάζεστε με τα αρχεία σας.",
      heroDescription:
        "Μετατρέψτε, συμπιέστε, αλλάξτε μέγεθος, επεξεργαστείτε και διαχειριστείτε εικόνες, PDF και καθημερινά αρχεία με απλά online εργαλεία.",
      searchPlaceholder: "Αναζήτηση εργαλείων, PDF, εικόνων, συμπίεσης, μετατροπής...",
      toolsLabel: "Εργαλεία",
      toolsTitle: "Βρείτε το εργαλείο που χρειάζεστε.",
      toolsDescription:
        "Περιηγηθείτε στη συλλογή ή αναζητήστε ανάλογα με αυτό που θέλετε να κάνετε.",
      tool: "εργαλείο",
      tools: "εργαλεία",
      openTool: "Άνοιγμα εργαλείου",
      noToolsFound: "Δεν βρέθηκαν εργαλεία",
      noToolsDescription:
        "Δοκιμάστε έναν άλλο όρο αναζήτησης ή επιλέξτε άλλη κατηγορία.",
      clearSearch: "Εκκαθάριση αναζήτησης",
      all: "Όλα",
      images: "Εικόνες",
      pdf: "PDF",
      convert: "Μετατροπή",
      compress: "Συμπίεση",
      productLabel: "ToolsGift",
      productTitle: "Χρήσιμα εργαλεία χωρίς περιττή πολυπλοκότητα.",
      productDescription:
        "Το ToolsGift συγκεντρώνει εργαλεία για αρχεία, έγγραφα και καθημερινές εργασίες σε ένα μέρος.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },
    categories: {
      imageTools: "Εργαλεία εικόνων",
      organizePdf: "Οργάνωση PDF",
      optimizePdf: "Βελτιστοποίηση PDF",
      convertToPdf: "Μετατροπή σε PDF",
      convertFromPdf: "Μετατροπή από PDF",
      editPdf: "Επεξεργασία PDF",
      pdfSecurity: "Ασφάλεια PDF",
      pdfIntelligence: "Έξυπνα εργαλεία PDF",
      utilityOther: "Βοηθητικά και άλλα",
    },
    footer: {
      about: "Σχετικά",
      contact: "Επικοινωνία",
      privacy: "Απόρρητο",
      terms: "Όροι",
      cookies: "Cookies",
      disclaimer: "Αποποίηση ευθύνης",
      copyright: "© ToolsGift. Με επιφύλαξη παντός δικαιώματος.",
    },
    messages: {
      fileTooLarge: "Το αρχείο είναι πολύ μεγάλο.",
      invalidFile: "Μη έγκυρο αρχείο.",
      unsupportedFormat: "Μη υποστηριζόμενη μορφή αρχείου.",
      uploadFailed: "Η μεταφόρτωση απέτυχε.",
      processingFailed: "Η επεξεργασία απέτυχε.",
      somethingWentWrong: "Κάτι πήγε στραβά. Δοκιμάστε ξανά.",
      noFileSelected: "Επιλέξτε πρώτα ένα αρχείο.",
      multipleFilesRequired: "Επιλέξτε πολλά αρχεία.",
    },
  },

  id: {
    languageName: "Bahasa Indonesia",

    auth: {
      signIn: "Masuk",
      signUp: "Buat akun",
      signOut: "Keluar",
      profile: "Profil",
      account: "Akun",
      planFree: "Paket gratis",
      planPremium: "Paket premium",

      pleaseWait: "Mohon tunggu...",
      showPassword: "Tampilkan",
      hidePassword: "Sembunyikan",

      name: "Nama",
      namePlaceholder: "Nama Anda",
      email: "Email",
      password: "Kata sandi",
      confirmPassword: "Konfirmasi kata sandi",
      currentPassword: "Kata sandi saat ini",
      newPassword: "Kata sandi baru",
      passwordHint: "Minimal 8 karakter, termasuk huruf dan angka.",

      loginTitle: "Selamat datang kembali",
      loginSubtitle: "Masuk ke akun ToolsGift Anda.",
      loginCta: "Masuk",
      forgotPassword: "Lupa kata sandi?",
      noAccount: "Belum punya akun?",
      createAccountCta: "Buat satu",

      signupTitle: "Buat akun Anda",
      signupSubtitle: "Buat akun gratis untuk mengelola profil dan pengaturan Anda.",
      signupCta: "Buat akun",
      haveAccount: "Sudah punya akun?",
      signInCta: "Masuk",

      forgotTitle: "Atur ulang kata sandi",
      forgotSubtitle: "Masukkan alamat email Anda dan kami akan mengirimkan tautan pengaturan ulang yang aman.",
      sendResetLink: "Kirim tautan",
      sentTitle: "Periksa kotak masuk Anda",
      sentSubtitle: "Jika ada akun untuk alamat tersebut, tautannya sedang dikirim. Tautan kedaluwarsa dalam 15 menit.",
      backToLogin: "Kembali ke halaman masuk",

      resetTitle: "Pilih kata sandi baru",
      resetSubtitle: "Masukkan kata sandi baru untuk akun Anda.",
      resetCta: "Perbarui kata sandi",
      updatedTitle: "Kata sandi diperbarui",
      updatedSubtitle: "Kata sandi Anda telah diubah. Semua sesi lain telah keluar.",
      goToSignIn: "Lanjutkan ke halaman masuk",
      invalidLinkTitle: "Tautan ini tidak lagi berlaku",
      invalidLinkSubtitle: "Tautan pengaturan ulang kedaluwarsa setelah 15 menit. Minta yang baru lalu coba lagi.",

      memberSince: "Anggota sejak",
      personalInfo: "Informasi pribadi",
      personalInfoDesc: "Nama Anda ditampilkan di seluruh akun ToolsGift Anda.",
      security: "Keamanan",
      securityDesc: "Ubah kata sandi Anda. Dengan mengubahnya, Anda akan keluar dari semua perangkat lain.",
      saveChanges: "Simpan perubahan",
      changesSaved: "Perubahan disimpan",
      changePasswordCta: "Ubah kata sandi",
      passwordChanged: "Kata sandi diubah",
      sessions: "Sesi",
      sessionsDesc: "Anda masuk di perangkat ini. Keluar dari semua perangkat mengakhiri semua sesi, termasuk sesi ini.",
      signOutEverywhere: "Keluar dari semua perangkat",

      continueWithGoogle: "Lanjutkan dengan Google",
      googleDivider: "atau",
      errGoogleCancelled: "Masuk dengan Google dibatalkan. Silakan coba lagi.",
      errGoogleFailed: "Terjadi kesalahan saat masuk dengan Google. Silakan coba lagi.",
      errGoogleEmailTaken: "Akun Google tersebut belum ditautkan ke akun ToolsGift Anda. Masuk terlebih dahulu dengan kata sandi, lalu tautkan dari profil Anda.",
      errGoogleNotConfigured: "Masuk dengan Google tidak tersedia saat ini. Silakan coba lagi nanti.",
      connectedAccounts: "Akun terhubung",
      connectedAccountsDesc: "Tautkan akun Google Anda untuk masuk dengan Google lain kali.",
      googleLinked: "Tertaut",
      linkGoogle: "Tautkan akun Google",
      errRequired: "Kolom ini wajib diisi.",
      errInvalidEmail: "Masukkan alamat email yang valid.",
      errName: "Nama harus terdiri dari 2 hingga 80 karakter.",
      errWeakPassword: "Gunakan minimal 8 karakter dengan huruf dan angka.",
      errPasswordMismatch: "Kata sandi tidak cocok.",
      errEmailTaken: "Akun dengan email ini sudah ada.",
      errInvalidCredentials: "Email atau kata sandi salah.",
      errWrongPassword: "Kata sandi Anda saat ini salah.",
      errRateLimited: "Terlalu banyak percobaan. Tunggu beberapa menit lalu coba lagi.",
      errInvalidToken: "Tautan ini tidak valid atau sudah kedaluwarsa.",
      errNotAuthenticated: "Silakan masuk untuk melanjutkan.",
      errNetwork: "Tidak dapat terhubung ke server. Periksa koneksi Anda lalu coba lagi.",
      errServer: "Terjadi kesalahan. Silakan coba lagi.",
    },

    nav: {
      home: "Beranda",
      allTools: "Semua Alat",
      images: "Gambar",
      pdf: "PDF",
      convert: "Konversi",
      search: "Cari",
      darkMode: "Mode Gelap",
      lightMode: "Mode Terang",
      more: "Lainnya",

      language: "Bahasa",
      menu: "Menu",
      tools: "Alat",
      features: "Fitur",
      howItWorks: "Cara kerja",
      faq: "Pertanyaan umum",
      getStarted: "Mulai",    },

    common: {
      upload: "Unggah",
      download: "Unduh",
      process: "Proses",
      convert: "Konversi",
      compress: "Kompres",
      resize: "Ubah Ukuran",
      edit: "Edit",
      remove: "Hapus",
      clear: "Bersihkan",
      reset: "Atur Ulang",
      save: "Simpan",
      cancel: "Batal",
      copy: "Salin",
      copied: "Disalin",
      open: "Buka",
      close: "Tutup",
      back: "Kembali",
      next: "Berikutnya",
      previous: "Sebelumnya",
      selectFile: "Pilih File",
      selectFiles: "Pilih File",
      chooseFile: "Pilih File",
      chooseFiles: "Pilih File",
      dragDrop: "Seret & letakkan file di sini",
      or: "atau",
      browse: "Jelajahi",
      loading: "Memuat...",
      processing: "Memproses...",
      completed: "Selesai",
      error: "Terjadi kesalahan",
      tryAgain: "Coba Lagi",
      removeFile: "Hapus File",
      downloadFile: "Unduh File",
      downloadFiles: "Unduh File",
      searchTools: "Cari alat...",
      noResults: "Tidak ada hasil",
    },

    home: {
      heroTitle: "Semua yang Anda butuhkan untuk bekerja dengan file.",
      heroDescription: "Konversi, kompres, ubah ukuran, edit, dan kelola gambar, PDF, dan file sehari-hari dengan alat online sederhana.",
      searchPlaceholder: "Cari alat, PDF, gambar, kompres, konversi...",
      toolsLabel: "Alat",
      toolsTitle: "Temukan alat yang Anda butuhkan.",
      toolsDescription: "Jelajahi koleksi atau cari berdasarkan kebutuhan Anda.",
      tool: "alat",
      tools: "alat",
      openTool: "Buka alat",
      noToolsFound: "Tidak ada alat ditemukan",
      noToolsDescription: "Coba istilah pencarian lain atau pilih kategori lain.",
      clearSearch: "Hapus pencarian",
      all: "Semua",
      images: "Gambar",
      pdf: "PDF",
      convert: "Konversi",
      compress: "Kompres",
      productLabel: "ToolsGift",
      productTitle: "Alat yang berguna tanpa kerumitan yang tidak perlu.",
      productDescription: "ToolsGift menggabungkan alat file, dokumen, dan utilitas sehari-hari di satu tempat.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "Alat Gambar",
      organizePdf: "Atur PDF",
      optimizePdf: "Optimalkan PDF",
      convertToPdf: "Konversi ke PDF",
      convertFromPdf: "Konversi dari PDF",
      editPdf: "Edit PDF",
      pdfSecurity: "Keamanan PDF",
      pdfIntelligence: "Inteligensi PDF",
      utilityOther: "Utilitas & Lainnya",
    },

    footer: {
      about: "Tentang",
      contact: "Kontak",
      privacy: "Privasi",
      terms: "Ketentuan",
      cookies: "Cookie",
      disclaimer: "Penafian",
      copyright: "© ToolsGift. Semua hak dilindungi.",
    },

    messages: {
      fileTooLarge: "File terlalu besar.",
      invalidFile: "File tidak valid.",
      unsupportedFormat: "Format file tidak didukung.",
      uploadFailed: "Pengunggahan gagal.",
      processingFailed: "Pemrosesan gagal.",
      somethingWentWrong: "Terjadi kesalahan. Silakan coba lagi.",
      noFileSelected: "Silakan pilih file terlebih dahulu.",
      multipleFilesRequired: "Silakan pilih beberapa file.",
    },
  },

  ms: {
    languageName: "Bahasa Melayu",

    auth: {
      signIn: "Log masuk",
      signUp: "Cipta akaun",
      signOut: "Log keluar",
      profile: "Profil",
      account: "Akaun",
      planFree: "Pelan percuma",
      planPremium: "Pelan premium",

      pleaseWait: "Sila tunggu...",
      showPassword: "Tunjuk",
      hidePassword: "Sembunyi",

      name: "Nama",
      namePlaceholder: "Nama anda",
      email: "E-mel",
      password: "Kata laluan",
      confirmPassword: "Sahkan kata laluan",
      currentPassword: "Kata laluan semasa",
      newPassword: "Kata laluan baharu",
      passwordHint: "Sekurang-kurangnya 8 aksara, termasuk huruf dan nombor.",

      loginTitle: "Selamat kembali",
      loginSubtitle: "Log masuk ke akaun ToolsGift anda.",
      loginCta: "Log masuk",
      forgotPassword: "Lupa kata laluan?",
      noAccount: "Tiada akaun?",
      createAccountCta: "Cipta satu",

      signupTitle: "Cipta akaun anda",
      signupSubtitle: "Cipta akaun percuma untuk mengurus profil dan tetapan anda.",
      signupCta: "Cipta akaun",
      haveAccount: "Sudah ada akaun?",
      signInCta: "Log masuk",

      forgotTitle: "Tetapkan semula kata laluan",
      forgotSubtitle: "Masukkan alamat e-mel anda dan kami akan menghantar pautan semakan selamat.",
      sendResetLink: "Hantar pautan",
      sentTitle: "Semak peti masuk anda",
      sentSubtitle: "Jika akaun wujud untuk alamat tersebut, pautan sedang dihantar. Pautan tamat tempoh dalam 15 minit.",
      backToLogin: "Kembali ke log masuk",

      resetTitle: "Pilih kata laluan baharu",
      resetSubtitle: "Masukkan kata laluan baharu untuk akaun anda.",
      resetCta: "Kemas kini kata laluan",
      updatedTitle: "Kata laluan dikemas kini",
      updatedSubtitle: "Kata laluan anda telah ditukar. Semua sesi lain telah log keluar.",
      goToSignIn: "Teruskan ke log masuk",
      invalidLinkTitle: "Pautan ini tidak lagi sah",
      invalidLinkSubtitle: "Pautan semakan tamat tempoh selepas 15 minit. Minta yang baharu dan cuba lagi.",

      memberSince: "Ahli sejak",
      personalInfo: "Maklumat peribadi",
      personalInfoDesc: "Nama anda dipaparkan di seluruh akaun ToolsGift anda.",
      security: "Keselamatan",
      securityDesc: "Tukar kata laluan anda. Dengan menukar, anda akan log keluar dari semua peranti lain.",
      saveChanges: "Simpan perubahan",
      changesSaved: "Perubahan disimpan",
      changePasswordCta: "Tukar kata laluan",
      passwordChanged: "Kata laluan ditukar",
      sessions: "Sesi",
      sessionsDesc: "Anda telah log masuk pada peranti ini. Log keluar dari semua peranti menamatkan semua sesi, termasuk sesi ini.",
      signOutEverywhere: "Log keluar dari semua peranti",

      continueWithGoogle: "Teruskan dengan Google",
      googleDivider: "atau",
      errGoogleCancelled: "Log masuk Google dibatalkan. Sila cuba lagi.",
      errGoogleFailed: "Sesuatu telah berlaku semasa log masuk dengan Google. Sila cuba lagi.",
      errGoogleEmailTaken: "Akaun Google tersebut belum dipautkan ke akaun ToolsGift anda. Log masuk dahulu dengan kata laluan anda, kemudian pautkan dari profil anda.",
      errGoogleNotConfigured: "Log masuk dengan Google tidak tersedia buat masa ini. Sila cuba lagi kelak.",
      connectedAccounts: "Akaun dipautkan",
      connectedAccountsDesc: "Pautkan akaun Google anda untuk log masuk dengan Google pada masa akan datang.",
      googleLinked: "Dipautkan",
      linkGoogle: "Pautkan akaun Google",
      errRequired: "Medan ini diperlukan.",
      errInvalidEmail: "Masukkan alamat e-mel yang sah.",
      errName: "Nama mesti antara 2 hingga 80 aksara.",
      errWeakPassword: "Gunakan sekurang-kurangnya 8 aksara dengan huruf dan nombor.",
      errPasswordMismatch: "Kata laluan tidak sepadan.",
      errEmailTaken: "Akaun dengan e-mel ini sudah wujud.",
      errInvalidCredentials: "E-mel atau kata laluan salah.",
      errWrongPassword: "Kata laluan semasa anda salah.",
      errRateLimited: "Terlalu banyak percubaan. Tunggu beberapa minit dan cuba lagi.",
      errInvalidToken: "Pautan ini tidak sah atau telah tamat tempoh.",
      errNotAuthenticated: "Sila log masuk untuk meneruskan.",
      errNetwork: "Tidak dapat mencapai pelayan. Semak sambungan anda dan cuba lagi.",
      errServer: "Sesuatu telah berlaku. Sila cuba lagi.",
    },

    nav: {
      home: "Laman Utama",
      allTools: "Semua Alat",
      images: "Imej",
      pdf: "PDF",
      convert: "Tukar",
      search: "Cari",
      darkMode: "Mod Gelap",
      lightMode: "Mod Cerah",
      more: "Lagi",

      language: "Bahasa",
      menu: "Menu",
      tools: "Alat",
      features: "Ciri",
      howItWorks: "Cara ia berfungsi",
      faq: "Soalan lazim",
      getStarted: "Mula",    },

    common: {
      upload: "Muat Naik",
      download: "Muat Turun",
      process: "Proses",
      convert: "Tukar",
      compress: "Mampatkan",
      resize: "Ubah Saiz",
      edit: "Edit",
      remove: "Buang",
      clear: "Kosongkan",
      reset: "Tetapkan Semula",
      save: "Simpan",
      cancel: "Batal",
      copy: "Salin",
      copied: "Disalin",
      open: "Buka",
      close: "Tutup",
      back: "Kembali",
      next: "Seterusnya",
      previous: "Sebelumnya",
      selectFile: "Pilih Fail",
      selectFiles: "Pilih Fail",
      chooseFile: "Pilih Fail",
      chooseFiles: "Pilih Fail",
      dragDrop: "Seret & lepas fail anda di sini",
      or: "atau",
      browse: "Semak Imbas",
      loading: "Memuatkan...",
      processing: "Memproses...",
      completed: "Selesai",
      error: "Sesuatu telah berlaku",
      tryAgain: "Cuba Lagi",
      removeFile: "Buang Fail",
      downloadFile: "Muat Turun Fail",
      downloadFiles: "Muat Turun Fail",
      searchTools: "Cari alat...",
      noResults: "Tiada hasil ditemui",
    },

    home: {
      heroTitle: "Semua yang anda perlukan untuk bekerja dengan fail anda.",
      heroDescription: "Tukar, mampatkan, ubah saiz, edit dan urus imej, PDF serta fail harian dengan alat dalam talian yang mudah.",
      searchPlaceholder: "Cari alat, PDF, imej, mampat, tukar...",
      toolsLabel: "Alat",
      toolsTitle: "Cari alat yang anda perlukan.",
      toolsDescription: "Semak koleksi atau cari berdasarkan perkara yang anda mahu lakukan.",
      tool: "alat",
      tools: "alat",
      openTool: "Buka alat",
      noToolsFound: "Tiada alat ditemui",
      noToolsDescription: "Cuba istilah carian lain atau pilih kategori lain.",
      clearSearch: "Kosongkan carian",
      all: "Semua",
      images: "Imej",
      pdf: "PDF",
      convert: "Tukar",
      compress: "Mampat",
      productLabel: "ToolsGift",
      productTitle: "Alat berguna tanpa kerumitan yang tidak diperlukan.",
      productDescription: "ToolsGift menghimpunkan alat fail, dokumen dan utiliti harian di satu tempat.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "Alat Imej",
      organizePdf: "Susun PDF",
      optimizePdf: "Optimumkan PDF",
      convertToPdf: "Tukar ke PDF",
      convertFromPdf: "Tukar daripada PDF",
      editPdf: "Edit PDF",
      pdfSecurity: "Keselamatan PDF",
      pdfIntelligence: "Perisikan PDF",
      utilityOther: "Utiliti & Lain-lain",
    },

    footer: {
      about: "Tentang",
      contact: "Hubungi",
      privacy: "Privasi",
      terms: "Terma",
      cookies: "Kuki",
      disclaimer: "Penafian",
      copyright: "© ToolsGift. Hak cipta terpelihara.",
    },

    messages: {
      fileTooLarge: "Fail terlalu besar.",
      invalidFile: "Fail tidak sah.",
      unsupportedFormat: "Format fail tidak disokong.",
      uploadFailed: "Muat naik gagal.",
      processingFailed: "Pemprosesan gagal.",
      somethingWentWrong: "Sesuatu telah berlaku. Sila cuba lagi.",
      noFileSelected: "Sila pilih fail dahulu.",
      multipleFilesRequired: "Sila pilih beberapa fail.",
    },
  },

  pl: {
    languageName: "Polski",

    auth: {
      signIn: "Zaloguj się",
      signUp: "Utwórz konto",
      signOut: "Wyloguj się",
      profile: "Profil",
      account: "Konto",
      planFree: "Plan darmowy",
      planPremium: "Plan premium",

      pleaseWait: "Proszę czekać...",
      showPassword: "Pokaż",
      hidePassword: "Ukryj",

      name: "Imię i nazwisko",
      namePlaceholder: "Twoje imię i nazwisko",
      email: "E-mail",
      password: "Hasło",
      confirmPassword: "Potwierdź hasło",
      currentPassword: "Obecne hasło",
      newPassword: "Nowe hasło",
      passwordHint: "Co najmniej 8 znaków, w tym litera i cyfra.",

      loginTitle: "Witamy ponownie",
      loginSubtitle: "Zaloguj się do swojego konta ToolsGift.",
      loginCta: "Zaloguj się",
      forgotPassword: "Zapomniałeś hasła?",
      noAccount: "Nie masz konta?",
      createAccountCta: "Załóż je",

      signupTitle: "Utwórz swoje konto",
      signupSubtitle: "Utwórz darmowe konto, aby zarządzać profilem i ustawieniami.",
      signupCta: "Utwórz konto",
      haveAccount: "Masz już konto?",
      signInCta: "Zaloguj się",

      forgotTitle: "Zresetuj hasło",
      forgotSubtitle: "Podaj adres e-mail, a wyślemy Ci bezpieczny link do resetowania.",
      sendResetLink: "Wyślij link",
      sentTitle: "Sprawdź skrzynkę odbiorczą",
      sentSubtitle: "Jeśli konto istnieje dla tego adresu, link jest w drodze. Wygasa po 15 minutach.",
      backToLogin: "Powrót do logowania",

      resetTitle: "Wybierz nowe hasło",
      resetSubtitle: "Podaj nowe hasło dla swojego konta.",
      resetCta: "Zaktualizuj hasło",
      updatedTitle: "Hasło zaktualizowane",
      updatedSubtitle: "Twoje hasło zostało zmienione. Wszystkie pozostałe sesje zostały wylogowane.",
      goToSignIn: "Przejdź do logowania",
      invalidLinkTitle: "Ten link jest już nieważny",
      invalidLinkSubtitle: "Linki do resetowania wygasają po 15 minutach. Poproś o nowy i spróbuj ponownie.",

      memberSince: "Członek od",
      personalInfo: "Dane osobowe",
      personalInfoDesc: "Twoje imię i nazwisko jest wyświetlane w całym koncie ToolsGift.",
      security: "Bezpieczeństwo",
      securityDesc: "Zmień swoje hasło. Po zmianie zostaniesz wylogowany na wszystkich innych urządzeniach.",
      saveChanges: "Zapisz zmiany",
      changesSaved: "Zmiany zapisane",
      changePasswordCta: "Zmień hasło",
      passwordChanged: "Hasło zmienione",
      sessions: "Sesje",
      sessionsDesc: "Jesteś zalogowany na tym urządzeniu. Wylogowanie wszędzie kończy wszystkie sesje, włącznie z tą.",
      signOutEverywhere: "Wyloguj wszędzie",

      continueWithGoogle: "Kontynuuj z Google",
      googleDivider: "lub",
      errGoogleCancelled: "Logowanie przez Google zostało anulowane. Spróbuj ponownie.",
      errGoogleFailed: "Coś poszło nie tak podczas logowania przez Google. Spróbuj ponownie.",
      errGoogleEmailTaken: "To konto Google nie jest jeszcze powiązane z Twoim kontem ToolsGift. Najpierw zaloguj się hasłem, a następnie powiąż je w swoim profilu.",
      errGoogleNotConfigured: "Logowanie przez Google jest obecnie niedostępne. Spróbuj ponownie później.",
      connectedAccounts: "Powiązane konta",
      connectedAccountsDesc: "Powiąż konto Google, aby następnym razem logować się przez Google.",
      googleLinked: "Powiązano",
      linkGoogle: "Powiąż konto Google",
      errRequired: "To pole jest wymagane.",
      errInvalidEmail: "Podaj prawidłowy adres e-mail.",
      errName: "Imię i nazwisko musi mieć od 2 do 80 znaków.",
      errWeakPassword: "Użyj co najmniej 8 znaków, w tym litery i cyfry.",
      errPasswordMismatch: "Hasła nie są zgodne.",
      errEmailTaken: "Konto z tym adresem e-mail już istnieje.",
      errInvalidCredentials: "Nieprawidłowy e-mail lub hasło.",
      errWrongPassword: "Twoje obecne hasło jest nieprawidłowe.",
      errRateLimited: "Zbyt wiele prób. Poczekaj kilka minut i spróbuj ponownie.",
      errInvalidToken: "Ten link jest nieprawidłowy lub wygasł.",
      errNotAuthenticated: "Zaloguj się, aby kontynuować.",
      errNetwork: "Nie można połączyć się z serwerem. Sprawdź połączenie i spróbuj ponownie.",
      errServer: "Coś poszło nie tak. Spróbuj ponownie.",
    },

    nav: {
      home: "Strona główna",
      allTools: "Wszystkie narzędzia",
      images: "Obrazy",
      pdf: "PDF",
      convert: "Konwertuj",
      search: "Szukaj",
      darkMode: "Tryb ciemny",
      lightMode: "Tryb jasny",
      more: "Więcej",

      language: "Język",
      menu: "Menu",
      tools: "Narzędzia",
      features: "Funkcje",
      howItWorks: "Jak to działa",
      faq: "Najczęstsze pytania",
      getStarted: "Zacznij",    },

    common: {
      upload: "Prześlij",
      download: "Pobierz",
      process: "Przetwórz",
      convert: "Konwertuj",
      compress: "Kompresuj",
      resize: "Zmień rozmiar",
      edit: "Edytuj",
      remove: "Usuń",
      clear: "Wyczyść",
      reset: "Resetuj",
      save: "Zapisz",
      cancel: "Anuluj",
      copy: "Kopiuj",
      copied: "Skopiowano",
      open: "Otwórz",
      close: "Zamknij",
      back: "Wstecz",
      next: "Dalej",
      previous: "Poprzedni",
      selectFile: "Wybierz plik",
      selectFiles: "Wybierz pliki",
      chooseFile: "Wybierz plik",
      chooseFiles: "Wybierz pliki",
      dragDrop: "Przeciągnij i upuść plik tutaj",
      or: "lub",
      browse: "Przeglądaj",
      loading: "Ładowanie...",
      processing: "Przetwarzanie...",
      completed: "Zakończono",
      error: "Coś poszło nie tak",
      tryAgain: "Spróbuj ponownie",
      removeFile: "Usuń plik",
      downloadFile: "Pobierz plik",
      downloadFiles: "Pobierz pliki",
      searchTools: "Szukaj narzędzi...",
      noResults: "Nie znaleziono wyników",
    },

    home: {
      heroTitle: "Wszystko, czego potrzebujesz do pracy z plikami.",
      heroDescription: "Konwertuj, kompresuj, zmieniaj rozmiar, edytuj i zarządzaj obrazami, plikami PDF oraz codziennymi plikami za pomocą prostych narzędzi online.",
      searchPlaceholder: "Szukaj narzędzi, PDF, obrazów, kompresji, konwersji...",
      toolsLabel: "Narzędzia",
      toolsTitle: "Znajdź potrzebne narzędzie.",
      toolsDescription: "Przeglądaj kolekcję lub wyszukaj według tego, co chcesz zrobić.",
      tool: "narzędzie",
      tools: "narzędzia",
      openTool: "Otwórz narzędzie",
      noToolsFound: "Nie znaleziono narzędzi",
      noToolsDescription: "Spróbuj innego hasła lub wybierz inną kategorię.",
      clearSearch: "Wyczyść wyszukiwanie",
      all: "Wszystkie",
      images: "Obrazy",
      pdf: "PDF",
      convert: "Konwertuj",
      compress: "Kompresuj",
      productLabel: "ToolsGift",
      productTitle: "Przydatne narzędzia bez zbędnych komplikacji.",
      productDescription: "ToolsGift łączy narzędzia do plików, dokumentów i codziennych zadań w jednym miejscu.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "Narzędzia obrazów",
      organizePdf: "Organizuj PDF",
      optimizePdf: "Optymalizuj PDF",
      convertToPdf: "Konwertuj do PDF",
      convertFromPdf: "Konwertuj z PDF",
      editPdf: "Edytuj PDF",
      pdfSecurity: "Bezpieczeństwo PDF",
      pdfIntelligence: "Inteligencja PDF",
      utilityOther: "Narzędzia i inne",
    },

    footer: {
      about: "O nas",
      contact: "Kontakt",
      privacy: "Prywatność",
      terms: "Warunki",
      cookies: "Cookies",
      disclaimer: "Zastrzeżenie",
      copyright: "© ToolsGift. Wszelkie prawa zastrzeżone.",
    },

    messages: {
      fileTooLarge: "Plik jest za duży.",
      invalidFile: "Nieprawidłowy plik.",
      unsupportedFormat: "Nieobsługiwany format pliku.",
      uploadFailed: "Przesyłanie nie powiodło się.",
      processingFailed: "Przetwarzanie nie powiodło się.",
      somethingWentWrong: "Coś poszło nie tak. Spróbuj ponownie.",
      noFileSelected: "Najpierw wybierz plik.",
      multipleFilesRequired: "Wybierz kilka plików.",
    },
  },

  sv: {
    languageName: "Svenska",

    auth: {
      signIn: "Logga in",
      signUp: "Skapa konto",
      signOut: "Logga ut",
      profile: "Profil",
      account: "Konto",
      planFree: "Gratisplan",
      planPremium: "Premiumplan",

      pleaseWait: "Vänta...",
      showPassword: "Visa",
      hidePassword: "Dölj",

      name: "Namn",
      namePlaceholder: "Ditt namn",
      email: "E-post",
      password: "Lösenord",
      confirmPassword: "Bekräfta lösenord",
      currentPassword: "Nuvarande lösenord",
      newPassword: "Nytt lösenord",
      passwordHint: "Minst 8 tecken, inklusive en bokstav och en siffra.",

      loginTitle: "Välkommen tillbaka",
      loginSubtitle: "Logga in på ditt ToolsGift-konto.",
      loginCta: "Logga in",
      forgotPassword: "Glömt ditt lösenord?",
      noAccount: "Har du inget konto?",
      createAccountCta: "Skapa ett",

      signupTitle: "Skapa ditt konto",
      signupSubtitle: "Skapa ett gratis konto för att hantera din profil och dina inställningar.",
      signupCta: "Skapa konto",
      haveAccount: "Har du redan ett konto?",
      signInCta: "Logga in",

      forgotTitle: "Återställ ditt lösenord",
      forgotSubtitle: "Ange din e-postadress så skickar vi en säker återställningslänk.",
      sendResetLink: "Skicka länk",
      sentTitle: "Kontrollera din inkorg",
      sentSubtitle: "Om ett konto finns för adressen är länken på väg. Den går ut om 15 minuter.",
      backToLogin: "Tillbaka till inloggningen",

      resetTitle: "Välj ett nytt lösenord",
      resetSubtitle: "Ange ett nytt lösenord för ditt konto.",
      resetCta: "Uppdatera lösenord",
      updatedTitle: "Lösenordet uppdaterat",
      updatedSubtitle: "Ditt lösenord har ändrats. Alla andra sessioner har loggats ut.",
      goToSignIn: "Fortsätt till inloggningen",
      invalidLinkTitle: "Den här länken är inte längre giltig",
      invalidLinkSubtitle: "Återställningslänkar går ut efter 15 minuter. Begär en ny och försök igen.",

      memberSince: "Medlem sedan",
      personalInfo: "Personlig information",
      personalInfoDesc: "Ditt namn visas i hela ditt ToolsGift-konto.",
      security: "Säkerhet",
      securityDesc: "Ändra ditt lösenord. När du ändrar det loggs du ut på alla andra enheter.",
      saveChanges: "Spara ändringar",
      changesSaved: "Ändringarna har sparats",
      changePasswordCta: "Ändra lösenord",
      passwordChanged: "Lösenordet har ändrats",
      sessions: "Sessioner",
      sessionsDesc: "Du är inloggad på den här enheten. Utloggning överallt avslutar alla sessioner, inklusive den här.",
      signOutEverywhere: "Logga ut överallt",

      continueWithGoogle: "Fortsätt med Google",
      googleDivider: "eller",
      errGoogleCancelled: "Google-inloggningen avbröts. Försök igen.",
      errGoogleFailed: "Något gick fel när du loggade in med Google. Försök igen.",
      errGoogleEmailTaken: "Det Google-kontot är ännu inte länkat till ditt ToolsGift-konto. Logga in med ditt lösenord först och länka det sedan från din profil.",
      errGoogleNotConfigured: "Google-inloggning är inte tillgänglig just nu. Försök igen senare.",
      connectedAccounts: "Länkade konton",
      connectedAccountsDesc: "Länka ditt Google-konto för att logga in med Google nästa gång.",
      googleLinked: "Länkat",
      linkGoogle: "Länka Google-konto",
      errRequired: "Detta fält är obligatoriskt.",
      errInvalidEmail: "Ange en giltig e-postadress.",
      errName: "Namnet måste vara mellan 2 och 80 tecken.",
      errWeakPassword: "Använd minst 8 tecken med en bokstav och en siffra.",
      errPasswordMismatch: "Lösenorden matchar inte.",
      errEmailTaken: "Ett konto finns redan med den här e-postadressen.",
      errInvalidCredentials: "Fel e-post eller lösenord.",
      errWrongPassword: "Ditt nuvarande lösenord är fel.",
      errRateLimited: "För många försök. Vänta några minuter och försök igen.",
      errInvalidToken: "Den här länken är ogiltig eller har gått ut.",
      errNotAuthenticated: "Logga in för att fortsätta.",
      errNetwork: "Kunde inte nå servern. Kontrollera din anslutning och försök igen.",
      errServer: "Något gick fel. Försök igen.",
    },

    nav: {
      home: "Hem",
      allTools: "Alla verktyg",
      images: "Bilder",
      pdf: "PDF",
      convert: "Konvertera",
      search: "Sök",
      darkMode: "Mörkt läge",
      lightMode: "Ljust läge",
      more: "Mer",

      language: "Språk",
      menu: "Meny",
      tools: "Verktyg",
      features: "Funktioner",
      howItWorks: "Så fungerar det",
      faq: "Vanliga frågor",
      getStarted: "Kom igång",    },

    common: {
      upload: "Ladda upp",
      download: "Ladda ner",
      process: "Bearbeta",
      convert: "Konvertera",
      compress: "Komprimera",
      resize: "Ändra storlek",
      edit: "Redigera",
      remove: "Ta bort",
      clear: "Rensa",
      reset: "Återställ",
      save: "Spara",
      cancel: "Avbryt",
      copy: "Kopiera",
      copied: "Kopierad",
      open: "Öppna",
      close: "Stäng",
      back: "Tillbaka",
      next: "Nästa",
      previous: "Föregående",
      selectFile: "Välj fil",
      selectFiles: "Välj filer",
      chooseFile: "Välj fil",
      chooseFiles: "Välj filer",
      dragDrop: "Dra och släpp filen här",
      or: "eller",
      browse: "Bläddra",
      loading: "Laddar...",
      processing: "Bearbetar...",
      completed: "Klart",
      error: "Något gick fel",
      tryAgain: "Försök igen",
      removeFile: "Ta bort fil",
      downloadFile: "Ladda ner fil",
      downloadFiles: "Ladda ner filer",
      searchTools: "Sök verktyg...",
      noResults: "Inga resultat hittades",
    },

    home: {
      heroTitle: "Allt du behöver för att arbeta med dina filer.",
      heroDescription: "Konvertera, komprimera, ändra storlek, redigera och hantera bilder, PDF-filer och vardagliga filer med enkla onlineverktyg.",
      searchPlaceholder: "Sök verktyg, PDF, bilder, komprimera, konvertera...",
      toolsLabel: "Verktyg",
      toolsTitle: "Hitta verktyget du behöver.",
      toolsDescription: "Bläddra i samlingen eller sök efter det du vill göra.",
      tool: "verktyg",
      tools: "verktyg",
      openTool: "Öppna verktyg",
      noToolsFound: "Inga verktyg hittades",
      noToolsDescription: "Prova ett annat sökord eller välj en annan kategori.",
      clearSearch: "Rensa sökning",
      all: "Alla",
      images: "Bilder",
      pdf: "PDF",
      convert: "Konvertera",
      compress: "Komprimera",
      productLabel: "ToolsGift",
      productTitle: "Användbara verktyg utan onödig komplexitet.",
      productDescription: "ToolsGift samlar verktyg för filer, dokument och vardagliga uppgifter på ett ställe.",
      heroTagline: "ToolsGift",
      heroH1: "Free Online Tools for Images, PDFs & Files",
      heroSubtext: "Compress, convert, resize, merge, split and edit images, PDFs and everyday files with a free collection of online tools in your browser.",
      browseAllTools: "Browse all tools",
      imageToolsBtn: "Image tools",
      pdfToolsBtn: "PDF tools",
      sectionTagline: "Free online tools collection",
      sectionTitle: "Browse ToolsGift's online tools",
      sectionDescription: "Explore our collection of online tools for images, PDFs and everyday files — find the right tool to get the job done.",
      productStatementH2: "Free online tools without the unnecessary complexity",
    },

    categories: {
      imageTools: "Bildverktyg",
      organizePdf: "Organisera PDF",
      optimizePdf: "Optimera PDF",
      convertToPdf: "Konvertera till PDF",
      convertFromPdf: "Konvertera från PDF",
      editPdf: "Redigera PDF",
      pdfSecurity: "PDF-säkerhet",
      pdfIntelligence: "PDF-intelligens",
      utilityOther: "Verktyg och övrigt",
    },

    footer: {
      about: "Om oss",
      contact: "Kontakt",
      privacy: "Integritet",
      terms: "Villkor",
      cookies: "Cookies",
      disclaimer: "Ansvarsfriskrivning",
      copyright: "© ToolsGift. Alla rättigheter förbehållna.",
    },

    messages: {
      fileTooLarge: "Filen är för stor.",
      invalidFile: "Ogiltig fil.",
      unsupportedFormat: "Filformatet stöds inte.",
      uploadFailed: "Uppladdningen misslyckades.",
      processingFailed: "Bearbetningen misslyckades.",
      somethingWentWrong: "Något gick fel. Försök igen.",
      noFileSelected: "Välj en fil först.",
      multipleFilesRequired: "Välj flera filer.",
    },
  },

  th: {
    languageName: "ภาษาไทย",

    auth: {
      signIn: "เข้าสู่ระบบ",
      signUp: "สร้างบัญชี",
      signOut: "ออกจากระบบ",
      profile: "โปรไฟล์",
      account: "บัญชี",
      planFree: "แผนฟรี",
      planPremium: "แผนพรีเมียม",

      pleaseWait: "กรุณารอสักครู่...",
      showPassword: "แสดง",
      hidePassword: "ซ่อน",

      name: "ชื่อ",
      namePlaceholder: "ชื่อของคุณ",
      email: "อีเมล",
      password: "รหัสผ่าน",
      confirmPassword: "ยืนยันรหัสผ่าน",
      currentPassword: "รหัสผ่านปัจจุบัน",
      newPassword: "รหัสผ่านใหม่",
      passwordHint: "อย่างน้อย 8 อักขระ รวมตัวอักษรและตัวเลข",

      loginTitle: "ยินดีต้อนรับกลับ",
      loginSubtitle: "เข้าสู่บัญชี ToolsGift ของคุณ",
      loginCta: "เข้าสู่ระบบ",
      forgotPassword: "ลืมรหัสผ่าน?",
      noAccount: "ยังไม่มีบัญชี?",
      createAccountCta: "สร้างเลย",

      signupTitle: "สร้างบัญชีของคุณ",
      signupSubtitle: "สร้างบัญชีฟรีเพื่อจัดการโปรไฟล์และการตั้งค่าของคุณ",
      signupCta: "สร้างบัญชี",
      haveAccount: "มีบัญชีอยู่แล้ว?",
      signInCta: "เข้าสู่ระบบ",

      forgotTitle: "รีเซ็ตรหัสผ่าน",
      forgotSubtitle: "กรอกอีเมลของคุณ แล้วเราจะส่งลิงก์รีเซ็ตที่ปลอดภัยให้",
      sendResetLink: "ส่งลิงก์",
      sentTitle: "ตรวจสอบกล่องจดหมาย",
      sentSubtitle: "หากมีบัญชีสำหรับที่อยู่นี้ ลิงก์กำลังจะมาถึง ลิงก์หมดอายุใน 15 นาที",
      backToLogin: "กลับไปหน้าเข้าสู่ระบบ",

      resetTitle: "เลือกรหัสผ่านใหม่",
      resetSubtitle: "กรอกรหัสผ่านใหม่สำหรับบัญชีของคุณ",
      resetCta: "อัปเดตรหัสผ่าน",
      updatedTitle: "อัปเดตรหัสผ่านแล้ว",
      updatedSubtitle: "รหัสผ่านของคุณถูกเปลี่ยนแล้ว เซสชันอื่นทั้งหมดถูกออกจากระบบแล้ว",
      goToSignIn: "ไปหน้าเข้าสู่ระบบ",
      invalidLinkTitle: "ลิงก์นี้ใช้ไม่ได้อีกแล้ว",
      invalidLinkSubtitle: "ลิงก์รีเซ็ตหมดอายุหลัง 15 นาที ขอลิงก์ใหม่แล้วลองอีกครั้ง",

      memberSince: "สมาชิกตั้งแต่",
      personalInfo: "ข้อมูลส่วนตัว",
      personalInfoDesc: "ชื่อของคุณจะแสดงในบัญชี ToolsGift ทั้งหมด",
      security: "ความปลอดภัย",
      securityDesc: "เปลี่ยนรหัสผ่านของคุณ เมื่อเปลี่ยนแล้วคุณจะถูกออกจากระบบจากอุปกรณ์อื่นทั้งหมด",
      saveChanges: "บันทึกการเปลี่ยนแปลง",
      changesSaved: "บันทึกการเปลี่ยนแปลงแล้ว",
      changePasswordCta: "เปลี่ยนรหัสผ่าน",
      passwordChanged: "เปลี่ยนรหัสผ่านแล้ว",
      sessions: "เซสชัน",
      sessionsDesc: "คุณเข้าสู่ระบบบนอุปกรณ์นี้อยู่ การออกจากระบบทุกเครื่องจะยุติทุกเซสชัน รวมถึงเซสชันนี้",
      signOutEverywhere: "ออกจากระบบทุกเครื่อง",

      continueWithGoogle: "ดำเนินการต่อด้วย Google",
      googleDivider: "หรือ",
      errGoogleCancelled: "การลงชื่อเข้าใช้ด้วย Google ถูกยกเลิก โปรดลองอีกครั้ง",
      errGoogleFailed: "เกิดข้อผิดพลาดขณะลงชื่อเข้าใช้ด้วย Google โปรดลองอีกครั้ง",
      errGoogleEmailTaken: "บัญชี Google นี้ยังไม่ได้เชื่อมโยงกับบัญชี ToolsGift ของคุณ โปรดลงชื่อเข้าใช้ด้วยรหัสผ่านก่อน แล้วเชื่อมโยงจากโปรไฟล์ของคุณ",
      errGoogleNotConfigured: "ขณะนี้ไม่สามารถลงชื่อเข้าใช้ด้วย Google ได้ โปรดลองอีกครั้งในภายหลัง",
      connectedAccounts: "บัญชีที่เชื่อมโยง",
      connectedAccountsDesc: "เชื่อมโยงบัญชี Google ของคุณเพื่อลงชื่อเข้าใช้ด้วย Google ในครั้งถัดไป",
      googleLinked: "เชื่อมโยงแล้ว",
      linkGoogle: "เชื่อมโยงบัญชี Google",
      errRequired: "จำเป็นต้องกรอกช่องนี้",
      errInvalidEmail: "กรอกที่อยู่อีเมลที่ถูกต้อง",
      errName: "ชื่อต้องมีความยาวระหว่าง 2 ถึง 80 อักขระ",
      errWeakPassword: "ใช้อย่างน้อย 8 อักขระ โดยมีตัวอักษรและตัวเลข",
      errPasswordMismatch: "รหัสผ่านไม่ตรงกัน",
      errEmailTaken: "มีบัญชีสำหรับอีเมลนี้อยู่แล้ว",
      errInvalidCredentials: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      errWrongPassword: "รหัสผ่านปัจจุบันของคุณไม่ถูกต้อง",
      errRateLimited: "พยายามมากเกินไป รอสักครู่แล้วลองอีกครั้ง",
      errInvalidToken: "ลิงก์นี้ไม่ถูกต้องหรือหมดอายุแล้ว",
      errNotAuthenticated: "เข้าสู่ระบบเพื่อดำเนินการต่อ",
      errNetwork: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ตรวจสอบการเชื่อมต่อแล้วลองอีกครั้ง",
      errServer: "เกิดข้อผิดพลาด โปรดลองอีกครั้ง",
    },

    nav: {
      home: "หน้าหลัก",
      allTools: "เครื่องมือทั้งหมด",
      images: "รูปภาพ",
      pdf: "PDF",
      convert: "แปลงไฟล์",
      search: "ค้นหา",
      darkMode: "โหมดมืด",
      lightMode: "โหมดสว่าง",
      more: "เพิ่มเติม",

      language: "ภาษา",
      menu: "เมนู",
      tools: "เครื่องมือ",
      features: "ฟีเจอร์",
      howItWorks: "วิธีใช้งาน",
      faq: "คำถามที่พบบ่อย",
      getStarted: "เริ่มต้นใช้งาน",    },

    common: {
      upload: "อัปโหลด",
      download: "ดาวน์โหลด",
      process: "ประมวลผล",
      convert: "แปลง",
      compress: "บีบอัด",
      resize: "ปรับขนาด",
      edit: "แก้ไข",
      remove: "ลบ",
      clear: "ล้าง",
      reset: "รีเซ็ต",
      save: "บันทึก",
      cancel: "ยกเลิก",
      copy: "คัดลอก",
      copied: "คัดลอกแล้ว",
      open: "เปิด",
      close: "ปิด",
      back: "ย้อนกลับ",
      next: "ถัดไป",
      previous: "ก่อนหน้า",
      selectFile: "เลือกไฟล์",
      selectFiles: "เลือกไฟล์",
      chooseFile: "เลือกไฟล์",
      chooseFiles: "เลือกไฟล์",
      dragDrop: "ลากและวางไฟล์ที่นี่",
      or: "หรือ",
      browse: "เรียกดู",
      loading: "กำลังโหลด...",
      processing: "กำลังประมวลผล...",
      completed: "เสร็จสิ้น",
      error: "เกิดข้อผิดพลาด",
      tryAgain: "ลองอีกครั้ง",
      removeFile: "ลบไฟล์",
      downloadFile: "ดาวน์โหลดไฟล์",
      downloadFiles: "ดาวน์โหลดไฟล์",
      searchTools: "ค้นหาเครื่องมือ...",
      noResults: "ไม่พบผลลัพธ์",
    },

    home: {
      heroTitle: "ทุกสิ่งที่คุณต้องการสำหรับการทำงานกับไฟล์",
      heroDescription: "แปลง บีบอัด ปรับขนาด แก้ไข และจัดการรูปภาพ PDF และไฟล์ทั่วไปด้วยเครื่องมือออนไลน์ที่ใช้งานง่าย",
      searchPlaceholder: "ค้นหาเครื่องมือ, PDF, รูปภาพ, บีบอัด, แปลง...",
      toolsLabel: "เครื่องมือ",
      toolsTitle: "ค้นหาเครื่องมือที่คุณต้องการ",
      toolsDescription: "เรียกดูเครื่องมือหรือค้นหาตามสิ่งที่คุณต้องการทำ",
      tool: "เครื่องมือ",
      tools: "เครื่องมือ",
      openTool: "เปิดเครื่องมือ",
      noToolsFound: "ไม่พบเครื่องมือ",
      noToolsDescription: "ลองใช้คำค้นหาอื่นหรือเลือกหมวดหมู่อื่น",
      clearSearch: "ล้างการค้นหา",
      all: "ทั้งหมด",
      images: "รูปภาพ",
      pdf: "PDF",
      convert: "แปลง",
      compress: "บีบอัด",
      productLabel: "ToolsGift",
      productTitle: "เครื่องมือที่มีประโยชน์โดยไม่ซับซ้อนเกินจำเป็น",
      productDescription: "ToolsGift รวมเครื่องมือสำหรับไฟล์ เอกสาร และงานทั่วไปไว้ในที่เดียว",
      heroTagline: "ToolsGift",
      heroH1: "เครื่องมือออนไลน์ฟรีสำหรับรูปภาพ PDF และไฟล์",
      heroSubtext: "บีบอัด แปลง ปรับขนาด รวม แยก และแก้ไขรูปภาพ PDF และไฟล์ทั่วไปด้วยชุดเครื่องมือออนไลน์ฟรีในเบราว์เซอร์ของคุณ",
      browseAllTools: "เรียกดูเครื่องมือทั้งหมด",
      imageToolsBtn: "เครื่องมือรูปภาพ",
      pdfToolsBtn: "เครื่องมือ PDF",
      sectionTagline: "ชุดเครื่องมือออนไลน์ฟรี",
      sectionTitle: "เรียกดูเครื่องมือออนไลน์ของ ToolsGift",
      sectionDescription: "สำรวจชุดเครื่องมือออนไลน์สำหรับรูปภาพ PDF และไฟล์ทั่วไป — ค้นหาเครื่องมือที่เหมาะกับงานของคุณ",
      productStatementH2: "เครื่องมือออนไลน์ฟรีที่ไม่ซับซ้อนโดยไม่จำเป็น",
    },

    categories: {
      imageTools: "เครื่องมือรูปภาพ",
      organizePdf: "จัดระเบียบ PDF",
      optimizePdf: "ปรับปรุง PDF",
      convertToPdf: "แปลงเป็น PDF",
      convertFromPdf: "แปลงจาก PDF",
      editPdf: "แก้ไข PDF",
      pdfSecurity: "ความปลอดภัย PDF",
      pdfIntelligence: "เครื่องมืออัจฉริยะสำหรับ PDF",
      utilityOther: "ยูทิลิตี้และอื่นๆ",
    },

    footer: {
      about: "เกี่ยวกับ",
      contact: "ติดต่อ",
      privacy: "ความเป็นส่วนตัว",
      terms: "ข้อกำหนด",
      cookies: "คุกกี้",
      disclaimer: "ข้อจำกัดความรับผิดชอบ",
      copyright: "© ToolsGift สงวนลิขสิทธิ์",
    },

    messages: {
      fileTooLarge: "ไฟล์ใหญ่เกินไป",
      invalidFile: "ไฟล์ไม่ถูกต้อง",
      unsupportedFormat: "ไม่รองรับรูปแบบไฟล์นี้",
      uploadFailed: "อัปโหลดไม่สำเร็จ",
      processingFailed: "ประมวลผลไม่สำเร็จ",
      somethingWentWrong: "เกิดข้อผิดพลาด โปรดลองอีกครั้ง",
      noFileSelected: "โปรดเลือกไฟล์ก่อน",
      multipleFilesRequired: "โปรดเลือกหลายไฟล์",
    },
  },

  tr: {
    languageName: "Türkçe",

    auth: {
      signIn: "Giriş yap",
      signUp: "Hesap oluştur",
      signOut: "Çıkış yap",
      profile: "Profil",
      account: "Hesap",
      planFree: "Ücretsiz plan",
      planPremium: "Premium plan",

      pleaseWait: "Lütfen bekleyin...",
      showPassword: "Göster",
      hidePassword: "Gizle",

      name: "Ad",
      namePlaceholder: "Adınız",
      email: "E-posta",
      password: "Şifre",
      confirmPassword: "Şifreyi onaylayın",
      currentPassword: "Mevcut şifre",
      newPassword: "Yeni şifre",
      passwordHint: "En az 8 karakter; bir harf ve bir rakam içermelidir.",

      loginTitle: "Tekrar hoş geldiniz",
      loginSubtitle: "ToolsGift hesabınıza giriş yapın.",
      loginCta: "Giriş yap",
      forgotPassword: "Şifrenizi mi unuttunuz?",
      noAccount: "Hesabınız yok mu?",
      createAccountCta: "Hemen oluşturun",

      signupTitle: "Hesabınızı oluşturun",
      signupSubtitle: "Profilinizi ve ayarlarınızı yönetmek için ücretsiz bir hesap oluşturun.",
      signupCta: "Hesap oluştur",
      haveAccount: "Zaten hesabınız var mı?",
      signInCta: "Giriş yap",

      forgotTitle: "Şifrenizi sıfırlayın",
      forgotSubtitle: "E-posta adresinizi girin, size güvenli bir sıfırlama bağlantısı gönderelim.",
      sendResetLink: "Bağlantı gönder",
      sentTitle: "Gelen kutunuzu kontrol edin",
      sentSubtitle: "Bu adres için bir hesap varsa bağlantı yolda. Bağlantı 15 dakika sonra geçersiz olur.",
      backToLogin: "Girişe dön",

      resetTitle: "Yeni bir şifre seçin",
      resetSubtitle: "Hesabınız için yeni bir şifre girin.",
      resetCta: "Şifreyi güncelle",
      updatedTitle: "Şifre güncellendi",
      updatedSubtitle: "Şifreniz değiştirildi. Diğer tüm oturumlar kapatıldı.",
      goToSignIn: "Girişe devam et",
      invalidLinkTitle: "Bu bağlantı artık geçerli değil",
      invalidLinkSubtitle: "Sıfırlama bağlantıları 15 dakika sonra geçersiz olur. Yeni bir tane isteyip tekrar deneyin.",

      memberSince: "Üyelik tarihi",
      personalInfo: "Kişisel bilgiler",
      personalInfoDesc: "Adınız ToolsGift hesabınızın tamamında görünür.",
      security: "Güvenlik",
      securityDesc: "Şifrenizi değiştirin. Değiştirdiğinizde diğer tüm cihazlardan çıkış yapılırsınız.",
      saveChanges: "Değişiklikleri kaydet",
      changesSaved: "Değişiklikler kaydedildi",
      changePasswordCta: "Şifreyi değiştir",
      passwordChanged: "Şifre değiştirildi",
      sessions: "Oturumlar",
      sessionsDesc: "Bu cihazda oturum açtınız. Her yerden çıkış yapmak bu oturum dahil tüm oturumları sonlandırır.",
      signOutEverywhere: "Her yerden çıkış yap",

      continueWithGoogle: "Google ile devam et",
      googleDivider: "veya",
      errGoogleCancelled: "Google ile oturum açma iptal edildi. Lütfen tekrar deneyin.",
      errGoogleFailed: "Google ile oturum açarken bir sorun oluştu. Lütfen tekrar deneyin.",
      errGoogleEmailTaken: "Bu Google hesabı henüz ToolsGift hesabınıza bağlı değil. Önce şifrenizle oturum açın, ardından profilinizden bağlayın.",
      errGoogleNotConfigured: "Google ile oturum açma şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
      connectedAccounts: "Bağlı hesaplar",
      connectedAccountsDesc: "Gelecek sefer Google ile giriş yapmak için Google hesabınızı bağlayın.",
      googleLinked: "Bağlı",
      linkGoogle: "Google hesabını bağla",
      errRequired: "Bu alan zorunludur.",
      errInvalidEmail: "Geçerli bir e-posta adresi girin.",
      errName: "Ad 2 ile 80 karakter arasında olmalıdır.",
      errWeakPassword: "Harf ve rakam içeren en az 8 karakter kullanın.",
      errPasswordMismatch: "Şifreler eşleşmiyor.",
      errEmailTaken: "Bu e-posta adresiyle bir hesap zaten var.",
      errInvalidCredentials: "E-posta veya şifre hatalı.",
      errWrongPassword: "Mevcut şifreniz hatalı.",
      errRateLimited: "Çok fazla deneme. Birkaç dakika bekleyip tekrar deneyin.",
      errInvalidToken: "Bu bağlantı geçersiz veya süresi dolmuş.",
      errNotAuthenticated: "Devam etmek için giriş yapın.",
      errNetwork: "Sunucuya ulaşılamadı. Bağlantınızı kontrol edip tekrar deneyin.",
      errServer: "Bir şeyler ters gitti. Lütfen tekrar deneyin.",
    },

    nav: {
      home: "Ana Sayfa",
      allTools: "Tüm Araçlar",
      images: "Görseller",
      pdf: "PDF",
      convert: "Dönüştür",
      search: "Ara",
      darkMode: "Karanlık Mod",
      lightMode: "Açık Mod",
      more: "Daha Fazla",

      language: "Dil",
      menu: "Menü",
      tools: "Araçlar",
      features: "Özellikler",
      howItWorks: "Nasıl çalışır",
      faq: "Sık sorulan sorular",
      getStarted: "Başlayın",    },

    common: {
      upload: "Yükle",
      download: "İndir",
      process: "İşle",
      convert: "Dönüştür",
      compress: "Sıkıştır",
      resize: "Yeniden Boyutlandır",
      edit: "Düzenle",
      remove: "Kaldır",
      clear: "Temizle",
      reset: "Sıfırla",
      save: "Kaydet",
      cancel: "İptal",
      copy: "Kopyala",
      copied: "Kopyalandı",
      open: "Aç",
      close: "Kapat",
      back: "Geri",
      next: "İleri",
      previous: "Önceki",
      selectFile: "Dosya Seç",
      selectFiles: "Dosyaları Seç",
      chooseFile: "Dosya Seç",
      chooseFiles: "Dosyaları Seç",
      dragDrop: "Dosyanızı buraya sürükleyip bırakın",
      or: "veya",
      browse: "Gözat",
      loading: "Yükleniyor...",
      processing: "İşleniyor...",
      completed: "Tamamlandı",
      error: "Bir şeyler yanlış gitti",
      tryAgain: "Tekrar Dene",
      removeFile: "Dosyayı Kaldır",
      downloadFile: "Dosyayı İndir",
      downloadFiles: "Dosyaları İndir",
      searchTools: "Araçları ara...",
      noResults: "Sonuç bulunamadı",
    },

    home: {
      heroTitle: "Dosyalarınızla çalışmak için ihtiyacınız olan her şey.",
      heroDescription: "Görüntüleri, PDF'leri ve günlük dosyaları basit çevrimiçi araçlarla dönüştürün, sıkıştırın, yeniden boyutlandırın, düzenleyin ve yönetin.",
      searchPlaceholder: "Araç, PDF, görsel, sıkıştır, dönüştür...",
      toolsLabel: "Araçlar",
      toolsTitle: "İhtiyacınız olan aracı bulun.",
      toolsDescription: "Koleksiyona göz atın veya yapmak istediğiniz işe göre arayın.",
      tool: "araç",
      tools: "araç",
      openTool: "Aracı Aç",
      noToolsFound: "Araç bulunamadı",
      noToolsDescription: "Farklı bir arama terimi deneyin veya başka bir kategori seçin.",
      clearSearch: "Aramayı Temizle",
      all: "Tümü",
      images: "Görseller",
      pdf: "PDF",
      convert: "Dönüştür",
      compress: "Sıkıştır",
      productLabel: "ToolsGift",
      productTitle: "Gereksiz karmaşıklık olmadan kullanışlı araçlar.",
      productDescription: "ToolsGift dosya, belge ve günlük yardımcı araçlarını tek bir yerde toplar.",
      heroTagline: "ToolsGift",
      heroH1: "Görseller, PDF'ler ve Dosyalar için Ücretsiz Çevrimiçi Araçlar",
      heroSubtext: "Görselleri, PDF'leri ve günlük dosyaları tarayıcınızdaki ücretsiz çevrimiçi araç koleksiyonuyla sıkıştırın, dönüştürün, yeniden boyutlandırın, birleştirin, bölün ve düzenleyin.",
      browseAllTools: "Tüm araçlara göz at",
      imageToolsBtn: "Görsel araçları",
      pdfToolsBtn: "PDF araçları",
      sectionTagline: "Ücretsiz çevrimiçi araç koleksiyonu",
      sectionTitle: "ToolsGift'in çevrimiçi araçlarına göz atın",
      sectionDescription: "Görseller, PDF'ler ve günlük dosyalar için çevrimiçi araç koleksiyonumuzu keşfedin — işi bitirmek için doğru aracı bulun.",
      productStatementH2: "Gereksiz karmaşıklık olmadan ücretsiz çevrimiçi araçlar",
    },

    categories: {
      imageTools: "Görsel Araçları",
      organizePdf: "PDF Düzenle",
      optimizePdf: "PDF'yi Optimize Et",
      convertToPdf: "PDF'ye Dönüştür",
      convertFromPdf: "PDF'den Dönüştür",
      editPdf: "PDF'yi Düzenle",
      pdfSecurity: "PDF Güvenliği",
      pdfIntelligence: "PDF Zekâsı",
      utilityOther: "Yardımcı Araçlar ve Diğer",
    },

    footer: {
      about: "Hakkımızda",
      contact: "İletişim",
      privacy: "Gizlilik",
      terms: "Şartlar",
      cookies: "Çerezler",
      disclaimer: "Sorumluluk Reddi",
      copyright: "© ToolsGift. Tüm hakları saklıdır.",
    },

    messages: {
      fileTooLarge: "Dosya çok büyük.",
      invalidFile: "Geçersiz dosya.",
      unsupportedFormat: "Desteklenmeyen dosya biçimi.",
      uploadFailed: "Yükleme başarısız oldu.",
      processingFailed: "İşleme başarısız oldu.",
      somethingWentWrong: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin.",
      noFileSelected: "Lütfen önce bir dosya seçin.",
      multipleFilesRequired: "Lütfen birden fazla dosya seçin.",
    },
  },

  uk: {
    languageName: "Українська",

    auth: {
      signIn: "Увійти",
      signUp: "Створити акаунт",
      signOut: "Вийти",
      profile: "Профіль",
      account: "Акаунт",
      planFree: "Безкоштовний тариф",
      planPremium: "Преміум-тариф",

      pleaseWait: "Зачекайте...",
      showPassword: "Показати",
      hidePassword: "Приховати",

      name: "Ім'я",
      namePlaceholder: "Ваше ім'я",
      email: "Ел. пошта",
      password: "Пароль",
      confirmPassword: "Підтвердьте пароль",
      currentPassword: "Поточний пароль",
      newPassword: "Новий пароль",
      passwordHint: "Щонайменше 8 символів, з літерою та цифрою.",

      loginTitle: "З поверненням",
      loginSubtitle: "Увійдіть у свій акаунт ToolsGift.",
      loginCta: "Увійти",
      forgotPassword: "Забули пароль?",
      noAccount: "Немає акаунта?",
      createAccountCta: "Створіть його",

      signupTitle: "Створіть свій акаунт",
      signupSubtitle: "Створіть безкоштовний акаунт, щоб керувати профілем і налаштуваннями.",
      signupCta: "Створити акаунт",
      haveAccount: "Уже маєте акаунт?",
      signInCta: "Увійти",

      forgotTitle: "Скидання пароля",
      forgotSubtitle: "Введіть адресу ел. пошти, і ми надішлемо вам безпечне посилання для скидання.",
      sendResetLink: "Надіслати посилання",
      sentTitle: "Перевірте пошту",
      sentSubtitle: "Якщо для цієї адреси є акаунт, посилання вже в дорозі. Воно спливає через 15 хвилин.",
      backToLogin: "Повернутися до входу",

      resetTitle: "Виберіть новий пароль",
      resetSubtitle: "Введіть новий пароль для свого акаунта.",
      resetCta: "Оновити пароль",
      updatedTitle: "Пароль оновлено",
      updatedSubtitle: "Ваш пароль змінено. Усі інші сеанси завершено.",
      goToSignIn: "Продовжити до входу",
      invalidLinkTitle: "Це посилання більше не дійсне",
      invalidLinkSubtitle: "Посилання для скидання спливають через 15 хвилин. Запитайте нове та спробуйте ще раз.",

      memberSince: "Учасник з",
      personalInfo: "Особисті дані",
      personalInfoDesc: "Ваше ім'я відображається в усьому акаунті ToolsGift.",
      security: "Безпека",
      securityDesc: "Змініть пароль. Після зміни вас буде виведено з усіх інших пристроїв.",
      saveChanges: "Зберегти зміни",
      changesSaved: "Зміни збережено",
      changePasswordCta: "Змінити пароль",
      passwordChanged: "Пароль змінено",
      sessions: "Сеанси",
      sessionsDesc: "Ви ввійшли на цьому пристрої. Вихід усюди завершує всі сеанси, включно з цим.",
      signOutEverywhere: "Вийти усюди",

      continueWithGoogle: "Продовжити з Google",
      googleDivider: "або",
      errGoogleCancelled: "Вхід через Google скасовано. Спробуйте ще раз.",
      errGoogleFailed: "Під час входу через Google сталася помилка. Спробуйте ще раз.",
      errGoogleEmailTaken: "Цей обліковий запис Google ще не прив'язано до вашого облікового запису ToolsGift. Спочатку увійдіть за паролем, потім прив'яжіть його у профілі.",
      errGoogleNotConfigured: "Вхід через Google зараз недоступний. Спробуйте пізніше.",
      connectedAccounts: "Прив'язані облікові записи",
      connectedAccountsDesc: "Прив'яжіть обліковий запис Google, щоб наступного разу входити через Google.",
      googleLinked: "Прив'язано",
      linkGoogle: "Прив'язати обліковий запис Google",
      errRequired: "Це поле обов'язкове.",
      errInvalidEmail: "Введіть дійсну адресу ел. пошти.",
      errName: "Ім'я повинно мати від 2 до 80 символів.",
      errWeakPassword: "Використовуйте щонайменше 8 символів із літерою та цифрою.",
      errPasswordMismatch: "Паролі не збігаються.",
      errEmailTaken: "Акаунт з цією адресою вже існує.",
      errInvalidCredentials: "Невірна ел. пошта або пароль.",
      errWrongPassword: "Ваш поточний пароль невірний.",
      errRateLimited: "Забагато спроб. Зачекайте кілька хвилин і спробуйте ще раз.",
      errInvalidToken: "Це посилання недійсне або сплило.",
      errNotAuthenticated: "Увійдіть, щоб продовжити.",
      errNetwork: "Не вдалося зв'язатися з сервером. Перевірте з'єднання та спробуйте ще раз.",
      errServer: "Щось пішло не так. Спробуйте ще раз.",
    },

    nav: {
      home: "Головна",
      allTools: "Усі інструменти",
      images: "Зображення",
      pdf: "PDF",
      convert: "Конвертувати",
      search: "Пошук",
      darkMode: "Темний режим",
      lightMode: "Світлий режим",
      more: "Ще",

      language: "Мова",
      menu: "Меню",
      tools: "Інструменти",
      features: "Можливості",
      howItWorks: "Як це працює",
      faq: "Поширені запитання",
      getStarted: "Почати",    },

    common: {
      upload: "Завантажити",
      download: "Завантажити",
      process: "Обробити",
      convert: "Конвертувати",
      compress: "Стиснути",
      resize: "Змінити розмір",
      edit: "Редагувати",
      remove: "Видалити",
      clear: "Очистити",
      reset: "Скинути",
      save: "Зберегти",
      cancel: "Скасувати",
      copy: "Копіювати",
      copied: "Скопійовано",
      open: "Відкрити",
      close: "Закрити",
      back: "Назад",
      next: "Далі",
      previous: "Попередній",
      selectFile: "Вибрати файл",
      selectFiles: "Вибрати файли",
      chooseFile: "Вибрати файл",
      chooseFiles: "Вибрати файли",
      dragDrop: "Перетягніть файл сюди",
      or: "або",
      browse: "Переглянути",
      loading: "Завантаження...",
      processing: "Обробка...",
      completed: "Завершено",
      error: "Щось пішло не так",
      tryAgain: "Спробувати ще",
      removeFile: "Видалити файл",
      downloadFile: "Завантажити файл",
      downloadFiles: "Завантажити файли",
      searchTools: "Пошук інструментів...",
      noResults: "Результатів не знайдено",
    },

    home: {
      heroTitle: "Усе необхідне для роботи з файлами.",
      heroDescription: "Конвертуйте, стискайте, змінюйте розмір, редагуйте та керуйте зображеннями, PDF і повсякденними файлами за допомогою простих онлайн-інструментів.",
      searchPlaceholder: "Пошук інструментів, PDF, зображень, стиснення, конвертації...",
      toolsLabel: "Інструменти",
      toolsTitle: "Знайдіть потрібний інструмент.",
      toolsDescription: "Переглядайте колекцію або шукайте за потрібною дією.",
      tool: "інструмент",
      tools: "інструменти",
      openTool: "Відкрити інструмент",
      noToolsFound: "Інструментів не знайдено",
      noToolsDescription: "Спробуйте інший пошуковий запит або виберіть іншу категорію.",
      clearSearch: "Очистити пошук",
      all: "Усі",
      images: "Зображення",
      pdf: "PDF",
      convert: "Конвертувати",
      compress: "Стиснути",
      productLabel: "ToolsGift",
      productTitle: "Корисні інструменти без зайвої складності.",
      productDescription: "ToolsGift об'єднує інструменти для файлів, документів і повсякденних завдань в одному місці.",
      heroTagline: "ToolsGift",
      heroH1: "Безкоштовні онлайн-інструменти для зображень, PDF і файлів",
      heroSubtext: "Стискайте, конвертуйте, змінюйте розмір, об'єднуйте, розділяйте та редагуйте зображення, PDF і повсякденні файли за допомогою безкоштовної колекції онлайн-інструментів у вашому браузері.",
      browseAllTools: "Переглянути всі інструменти",
      imageToolsBtn: "Інструменти для зображень",
      pdfToolsBtn: "Інструменти PDF",
      sectionTagline: "Безкоштовна колекція онлайн-інструментів",
      sectionTitle: "Перегляньте онлайн-інструменти ToolsGift",
      sectionDescription: "Досліджуйте нашу колекцію онлайн-інструментів для зображень, PDF і повсякденних файлів — знайдіть потрібний інструмент для виконання завдання.",
      productStatementH2: "Безкоштовні онлайн-інструменти без зайвої складності",
    },

    categories: {
      imageTools: "Інструменти для зображень",
      organizePdf: "Організація PDF",
      optimizePdf: "Оптимізація PDF",
      convertToPdf: "Конвертація в PDF",
      convertFromPdf: "Конвертація з PDF",
      editPdf: "Редагування PDF",
      pdfSecurity: "Безпека PDF",
      pdfIntelligence: "Інтелект PDF",
      utilityOther: "Утиліти та інше",
    },

    footer: {
      about: "Про нас",
      contact: "Контакти",
      privacy: "Конфіденційність",
      terms: "Умови",
      cookies: "Файли cookie",
      disclaimer: "Відмова від відповідальності",
      copyright: "© ToolsGift. Усі права захищено.",
    },

    messages: {
      fileTooLarge: "Файл завеликий.",
      invalidFile: "Недійсний файл.",
      unsupportedFormat: "Формат файлу не підтримується.",
      uploadFailed: "Не вдалося завантажити файл.",
      processingFailed: "Не вдалося обробити файл.",
      somethingWentWrong: "Щось пішло не так. Спробуйте ще раз.",
      noFileSelected: "Спочатку виберіть файл.",
      multipleFilesRequired: "Виберіть кілька файлів.",
    },
  },

  vi: {
    languageName: "Tiếng Việt",

    auth: {
      signIn: "Đăng nhập",
      signUp: "Tạo tài khoản",
      signOut: "Đăng xuất",
      profile: "Hồ sơ",
      account: "Tài khoản",
      planFree: "Gói miễn phí",
      planPremium: "Gói cao cấp",

      pleaseWait: "Vui lòng đợi...",
      showPassword: "Hiện",
      hidePassword: "Ẩn",

      name: "Họ tên",
      namePlaceholder: "Tên của bạn",
      email: "Email",
      password: "Mật khẩu",
      confirmPassword: "Xác nhận mật khẩu",
      currentPassword: "Mật khẩu hiện tại",
      newPassword: "Mật khẩu mới",
      passwordHint: "Ít nhất 8 ký tự, gồm chữ và số.",

      loginTitle: "Chào mừng trở lại",
      loginSubtitle: "Đăng nhập vào tài khoản ToolsGift của bạn.",
      loginCta: "Đăng nhập",
      forgotPassword: "Quên mật khẩu?",
      noAccount: "Chưa có tài khoản?",
      createAccountCta: "Tạo ngay",

      signupTitle: "Tạo tài khoản của bạn",
      signupSubtitle: "Tạo tài khoản miễn phí để quản lý hồ sơ và cài đặt.",
      signupCta: "Tạo tài khoản",
      haveAccount: "Đã có tài khoản?",
      signInCta: "Đăng nhập",

      forgotTitle: "Đặt lại mật khẩu",
      forgotSubtitle: "Nhập địa chỉ email của bạn, chúng tôi sẽ gửi liên kết đặt lại an toàn.",
      sendResetLink: "Gửi liên kết",
      sentTitle: "Kiểm tra hộp thư",
      sentSubtitle: "Nếu tồn tại tài khoản với địa chỉ đó, liên kết đang được gửi. Liên kết hết hạn sau 15 phút.",
      backToLogin: "Quay lại đăng nhập",

      resetTitle: "Chọn mật khẩu mới",
      resetSubtitle: "Nhập mật khẩu mới cho tài khoản của bạn.",
      resetCta: "Cập nhật mật khẩu",
      updatedTitle: "Đã cập nhật mật khẩu",
      updatedSubtitle: "Mật khẩu của bạn đã được thay đổi. Tất cả phiên khác đã được đăng xuất.",
      goToSignIn: "Tiếp tục đăng nhập",
      invalidLinkTitle: "Liên kết này không còn hiệu lực",
      invalidLinkSubtitle: "Liên kết đặt lại hết hạn sau 15 phút. Yêu cầu liên kết mới và thử lại.",

      memberSince: "Thành viên từ",
      personalInfo: "Thông tin cá nhân",
      personalInfoDesc: "Tên của bạn được hiển thị trong toàn bộ tài khoản ToolsGift.",
      security: "Bảo mật",
      securityDesc: "Đổi mật khẩu. Khi đổi, bạn sẽ bị đăng xuất trên mọi thiết bị khác.",
      saveChanges: "Lưu thay đổi",
      changesSaved: "Đã lưu thay đổi",
      changePasswordCta: "Đổi mật khẩu",
      passwordChanged: "Đã đổi mật khẩu",
      sessions: "Phiên",
      sessionsDesc: "Bạn đang đăng nhập trên thiết bị này. Đăng xuất ở mọi nơi sẽ kết thúc tất cả phiên, bao gồm phiên này.",
      signOutEverywhere: "Đăng xuất ở mọi nơi",

      continueWithGoogle: "Tiếp tục với Google",
      googleDivider: "hoặc",
      errGoogleCancelled: "Đăng nhập bằng Google đã bị hủy. Vui lòng thử lại.",
      errGoogleFailed: "Đã xảy ra lỗi khi đăng nhập bằng Google. Vui lòng thử lại.",
      errGoogleEmailTaken: "Tài khoản Google này chưa được liên kết với tài khoản ToolsGift của bạn. Hãy đăng nhập bằng mật khẩu trước, rồi liên kết từ hồ sơ của bạn.",
      errGoogleNotConfigured: "Đăng nhập bằng Google hiện không khả dụng. Vui lòng thử lại sau.",
      connectedAccounts: "Tài khoản đã liên kết",
      connectedAccountsDesc: "Liên kết tài khoản Google để đăng nhập bằng Google vào lần sau.",
      googleLinked: "Đã liên kết",
      linkGoogle: "Liên kết tài khoản Google",
      errRequired: "Trường này là bắt buộc.",
      errInvalidEmail: "Nhập địa chỉ email hợp lệ.",
      errName: "Tên phải có từ 2 đến 80 ký tự.",
      errWeakPassword: "Dùng ít nhất 8 ký tự với chữ và số.",
      errPasswordMismatch: "Mật khẩu không khớp.",
      errEmailTaken: "Đã tồn tại tài khoản với email này.",
      errInvalidCredentials: "Email hoặc mật khẩu không đúng.",
      errWrongPassword: "Mật khẩu hiện tại không đúng.",
      errRateLimited: "Quá nhiều lần thử. Hãy chờ vài phút rồi thử lại.",
      errInvalidToken: "Liên kết này không hợp lệ hoặc đã hết hạn.",
      errNotAuthenticated: "Vui lòng đăng nhập để tiếp tục.",
      errNetwork: "Không thể kết nối máy chủ. Kiểm tra kết nối và thử lại.",
      errServer: "Đã xảy ra lỗi. Vui lòng thử lại.",
    },

    nav: {
      home: "Trang chủ",
      allTools: "Tất cả công cụ",
      images: "Hình ảnh",
      pdf: "PDF",
      convert: "Chuyển đổi",
      search: "Tìm kiếm",
      darkMode: "Chế độ tối",
      lightMode: "Chế độ sáng",
      more: "Thêm",

      language: "Ngôn ngữ",
      menu: "Menu",
      tools: "Công cụ",
      features: "Tính năng",
      howItWorks: "Cách hoạt động",
      faq: "Câu hỏi thường gặp",
      getStarted: "Bắt đầu",    },

    common: {
      upload: "Tải lên",
      download: "Tải xuống",
      process: "Xử lý",
      convert: "Chuyển đổi",
      compress: "Nén",
      resize: "Đổi kích thước",
      edit: "Chỉnh sửa",
      remove: "Xóa",
      clear: "Xóa hết",
      reset: "Đặt lại",
      save: "Lưu",
      cancel: "Hủy",
      copy: "Sao chép",
      copied: "Đã sao chép",
      open: "Mở",
      close: "Đóng",
      back: "Quay lại",
      next: "Tiếp theo",
      previous: "Trước",
      selectFile: "Chọn tệp",
      selectFiles: "Chọn các tệp",
      chooseFile: "Chọn tệp",
      chooseFiles: "Chọn các tệp",
      dragDrop: "Kéo và thả tệp vào đây",
      or: "hoặc",
      browse: "Duyệt",
      loading: "Đang tải...",
      processing: "Đang xử lý...",
      completed: "Hoàn tất",
      error: "Đã xảy ra lỗi",
      tryAgain: "Thử lại",
      removeFile: "Xóa tệp",
      downloadFile: "Tải tệp xuống",
      downloadFiles: "Tải các tệp xuống",
      searchTools: "Tìm công cụ...",
      noResults: "Không tìm thấy kết quả",
    },

    home: {
      heroTitle: "Mọi thứ bạn cần để làm việc với tệp.",
      heroDescription: "Chuyển đổi, nén, thay đổi kích thước, chỉnh sửa và quản lý hình ảnh, PDF và các tệp hằng ngày bằng các công cụ trực tuyến đơn giản.",
      searchPlaceholder: "Tìm công cụ, PDF, hình ảnh, nén, chuyển đổi...",
      toolsLabel: "Công cụ",
      toolsTitle: "Tìm công cụ bạn cần.",
      toolsDescription: "Duyệt bộ sưu tập hoặc tìm kiếm theo việc bạn muốn làm.",
      tool: "công cụ",
      tools: "công cụ",
      openTool: "Mở công cụ",
      noToolsFound: "Không tìm thấy công cụ",
      noToolsDescription: "Hãy thử từ khóa khác hoặc chọn danh mục khác.",
      clearSearch: "Xóa tìm kiếm",
      all: "Tất cả",
      images: "Hình ảnh",
      pdf: "PDF",
      convert: "Chuyển đổi",
      compress: "Nén",
      productLabel: "ToolsGift",
      productTitle: "Công cụ hữu ích không có sự phức tạp không cần thiết.",
      productDescription: "ToolsGift tập hợp các công cụ cho tệp, tài liệu và công việc hằng ngày ở một nơi.",
      heroTagline: "ToolsGift",
      heroH1: "Công cụ trực tuyến miễn phí cho hình ảnh, PDF và tệp",
      heroSubtext: "Nén, chuyển đổi, thay đổi kích thước, gộp, tách và chỉnh sửa hình ảnh, PDF và các tệp hằng ngày bằng bộ sưu tập công cụ trực tuyến miễn phí ngay trong trình duyệt của bạn.",
      browseAllTools: "Xem tất cả công cụ",
      imageToolsBtn: "Công cụ hình ảnh",
      pdfToolsBtn: "Công cụ PDF",
      sectionTagline: "Bộ sưu tập công cụ trực tuyến miễn phí",
      sectionTitle: "Duyệt các công cụ trực tuyến của ToolsGift",
      sectionDescription: "Khám phá bộ sưu tập công cụ trực tuyến cho hình ảnh, PDF và các tệp hằng ngày — tìm đúng công cụ để hoàn thành công việc.",
      productStatementH2: "Công cụ trực tuyến miễn phí không phức tạp không cần thiết",
    },

    categories: {
      imageTools: "Công cụ hình ảnh",
      organizePdf: "Sắp xếp PDF",
      optimizePdf: "Tối ưu PDF",
      convertToPdf: "Chuyển đổi sang PDF",
      convertFromPdf: "Chuyển đổi từ PDF",
      editPdf: "Chỉnh sửa PDF",
      pdfSecurity: "Bảo mật PDF",
      pdfIntelligence: "Trí tuệ PDF",
      utilityOther: "Tiện ích & Khác",
    },

    footer: {
      about: "Giới thiệu",
      contact: "Liên hệ",
      privacy: "Quyền riêng tư",
      terms: "Điều khoản",
      cookies: "Cookie",
      disclaimer: "Tuyên bố miễn trừ",
      copyright: "© ToolsGift. Đã đăng ký bản quyền.",
    },

    messages: {
      fileTooLarge: "Tệp quá lớn.",
      invalidFile: "Tệp không hợp lệ.",
      unsupportedFormat: "Định dạng tệp không được hỗ trợ.",
      uploadFailed: "Tải lên thất bại.",
      processingFailed: "Xử lý thất bại.",
      somethingWentWrong: "Đã xảy ra lỗi. Vui lòng thử lại.",
      noFileSelected: "Vui lòng chọn tệp trước.",
      multipleFilesRequired: "Vui lòng chọn nhiều tệp.",
    },
  },

  sw: {
    languageName: "Kiswahili",

    auth: {
      signIn: "Ingia",
      signUp: "Fungua akaunti",
      signOut: "Toka",
      profile: "Wasifu",
      account: "Akaunti",
      planFree: "Mpango wa bure",
      planPremium: "Mpango wa premium",

      pleaseWait: "Tafadhali subiri...",
      showPassword: "Onyesha",
      hidePassword: "Ficha",

      name: "Jina",
      namePlaceholder: "Jina lako",
      email: "Barua pepe",
      password: "Nenosiri",
      confirmPassword: "Thibitisha nenosiri",
      currentPassword: "Nenosiri la sasa",
      newPassword: "Nenosiri jipya",
      passwordHint: "Angalau herufi 8, ikiwa na herufi na tarakimu.",

      loginTitle: "Karibu tena",
      loginSubtitle: "Ingia kwenye akaunti yako ya ToolsGift.",
      loginCta: "Ingia",
      forgotPassword: "Umesahau nenosiri lako?",
      noAccount: "Huna akaunti?",
      createAccountCta: "Fungua moja",

      signupTitle: "Fungua akaunti yako",
      signupSubtitle: "Fungua akaunti bure kusimamia wasifu na mipangilio yako.",
      signupCta: "Fungua akaunti",
      haveAccount: "Tayari una akaunti?",
      signInCta: "Ingia",

      forgotTitle: "Weka upya nenosiri lako",
      forgotSubtitle: "Weka barua pepe yako na tutakutumia kiungo salama cha kuweka upya.",
      sendResetLink: "Tuma kiungo",
      sentTitle: "Angalia kikasha chako",
      sentSubtitle: "Kama kuna akaunti kwa anwani hiyo, kiungo kinafufuliwa. Kiungo kinaisha baada ya dakika 15.",
      backToLogin: "Rudi kuingia",

      resetTitle: "Chagua nenosiri jipya",
      resetSubtitle: "Weka nenosiri jipya kwa akaunti yako.",
      resetCta: "Sasisha nenosiri",
      updatedTitle: "Nenosiri limesasishwa",
      updatedSubtitle: "Nenosiri lako limebadilishwa. Viti vingine vyote vimetoka.",
      goToSignIn: "Endelea kuingia",
      invalidLinkTitle: "Kiungo hiki si halali tena",
      invalidLinkSubtitle: "Viungo vya kuweka upya vinaisha baada ya dakika 15. Omba kipya kisha jaribu tena.",

      memberSince: "Mwanachama tangu",
      personalInfo: "Taarifa za kibinafsi",
      personalInfoDesc: "Jina lako linaonekana kwenye akaunti yako yote ya ToolsGift.",
      security: "Usalama",
      securityDesc: "Badilisha nenosiri lako. Ukibadilisha, utatoka kwenye kifaa kingine chochote.",
      saveChanges: "Hifadhi mabadiliko",
      changesSaved: "Mabadiliko yamehifadhiwa",
      changePasswordCta: "Badilisha nenosiri",
      passwordChanged: "Nenosiri limebadilishwa",
      sessions: "Viti",
      sessionsDesc: "Umeingia kwenye kifaa hiki. Kutoka kote kumaliza viti vyote, kikiwemo hiki.",
      signOutEverywhere: "Toka kote",

      continueWithGoogle: "Endelea na Google",
      googleDivider: "au",
      errGoogleCancelled: "Kuingia kwa Google kateguliwa. Tafadhali jaribu tena.",
      errGoogleFailed: "Kuna kitu kilichotokea unapoingia na Google. Tafadhali jaribu tena.",
      errGoogleEmailTaken: "Akaunti hii ya Google bado haijaunganishwa na akaunti yako ya ToolsGift. Ingia kwanza nenosiri lako kisha uiunganishe kutoka wasifu wako.",
      errGoogleNotConfigured: "Kuingia kwa Google hakupatikani sasa hivi. Tafadhali jaribu tena baadaye.",
      connectedAccounts: "Akaunti zilizounganishwa",
      connectedAccountsDesc: "Unganisha akaunti yako ili kuingia kwa Google wakati ujao.",
      googleLinked: "Imeunganishwa",
      linkGoogle: "Unganisha akaunti ya Google",
      errRequired: "Sehemu hii inahitajika.",
      errInvalidEmail: "Weka anwani halali ya barua pepe.",
      errName: "Jina lazima liwe na herufi 2 hadi 80.",
      errWeakPassword: "Tumia angalau herufi 8 zenye herufi na tarakimu.",
      errPasswordMismatch: "Nenosiri halilingani.",
      errEmailTaken: "Akaunti na barua pepe hii tayari ipo.",
      errInvalidCredentials: "Barua pepe au nenosiri si sahihi.",
      errWrongPassword: "Nenosiri lako la sasa si sahihi.",
      errRateLimited: "Majaribio mengi mno. Subiri dakika chache kisha jaribu tena.",
      errInvalidToken: "Kiungo hiki si sahihi au kimeisha.",
      errNotAuthenticated: "Ingia ili kuendelea.",
      errNetwork: "Hakuweza kufikia seva. Angalia muunganisho wako kisha jaribu tena.",
      errServer: "Kilichoenda kimetenda. Tafadhali jaribu tena.",
    },

    nav: {
      home: "Nyumbani",
      allTools: "Zana Zote",
      images: "Picha",
      pdf: "PDF",
      convert: "Badilisha",
      search: "Tafuta",
      darkMode: "Hali ya Giza",
      lightMode: "Hali ya Mwanga",
      more: "Zaidi",

      language: "Lugha",
      menu: "Menyu",
      tools: "Zana",
      features: "Vipengele",
      howItWorks: "Jinsi inavyofanya kazi",
      faq: "Maswali yanayoulizwa mara kwa mara",
      getStarted: "Anza",    },

    common: {
      upload: "Pakia",
      download: "Pakua",
      process: "Chakata",
      convert: "Badilisha",
      compress: "Punguza Ukubwa",
      resize: "Badilisha Ukubwa",
      edit: "Hariri",
      remove: "Ondoa",
      clear: "Futa",
      reset: "Weka Upya",
      save: "Hifadhi",
      cancel: "Ghairi",
      copy: "Nakili",
      copied: "Imenakiliwa",
      open: "Fungua",
      close: "Funga",
      back: "Rudi",
      next: "Inayofuata",
      previous: "Iliyotangulia",
      selectFile: "Chagua Faili",
      selectFiles: "Chagua Faili",
      chooseFile: "Chagua Faili",
      chooseFiles: "Chagua Faili",
      dragDrop: "Buruta na udondoshe faili hapa",
      or: "au",
      browse: "Vinjari",
      loading: "Inapakia...",
      processing: "Inachakata...",
      completed: "Imekamilika",
      error: "Kuna hitilafu",
      tryAgain: "Jaribu Tena",
      removeFile: "Ondoa Faili",
      downloadFile: "Pakua Faili",
      downloadFiles: "Pakua Faili",
      searchTools: "Tafuta zana...",
      noResults: "Hakuna matokeo",
    },

    home: {
      heroTitle: "Kila kitu unachohitaji kufanya kazi na faili zako.",
      heroDescription: "Badilisha, punguza ukubwa, hariri na simamia picha, PDF na faili za kila siku kwa zana rahisi za mtandaoni.",
      searchPlaceholder: "Tafuta zana, PDF, picha, punguza, badilisha...",
      toolsLabel: "Zana",
      toolsTitle: "Pata zana unayohitaji.",
      toolsDescription: "Vinjari mkusanyiko au tafuta kulingana na unachotaka kufanya.",
      tool: "zana",
      tools: "zana",
      openTool: "Fungua zana",
      noToolsFound: "Hakuna zana zilizopatikana",
      noToolsDescription: "Jaribu neno lingine la utafutaji au chagua kategoria nyingine.",
      clearSearch: "Futa utafutaji",
      all: "Zote",
      images: "Picha",
      pdf: "PDF",
      convert: "Badilisha",
      compress: "Punguza",
      productLabel: "ToolsGift",
      productTitle: "Zana muhimu bila ugumu usio wa lazima.",
      productDescription: "ToolsGift huleta zana za faili, hati na kazi za kila siku pamoja katika sehemu moja.",
      heroTagline: "ToolsGift",
      heroH1: "Zana za Mtandaoni Bila Malipo kwa Picha, PDF na Faili",
      heroSubtext: "Punguza, badilisha, badilisha ukubwa, unganisha, tenganisha na hariri picha, PDF na faili za kila siku kwa mkusanyiko wa zana za mtandaoni bila malipo kwenye kivinjari chako.",
      browseAllTools: "Vinjari zana zote",
      imageToolsBtn: "Zana za picha",
      pdfToolsBtn: "Zana za PDF",
      sectionTagline: "Mkusanyiko wa zana za mtandaoni bila malipo",
      sectionTitle: "Vinjari zana za mtandaoni za ToolsGift",
      sectionDescription: "Gundua mkusanyiko wetu wa zana za mtandaoni kwa picha, PDF na faili za kila siku — pata zana sahihi ya kukamilisha kazi.",
      productStatementH2: "Zana za mtandaoni bila malipo bila ugumu usio wa lazima",
    },

    categories: {
      imageTools: "Zana za Picha",
      organizePdf: "Panga PDF",
      optimizePdf: "Boresha PDF",
      convertToPdf: "Badilisha kuwa PDF",
      convertFromPdf: "Badilisha kutoka PDF",
      editPdf: "Hariri PDF",
      pdfSecurity: "Usalama wa PDF",
      pdfIntelligence: "Akili ya PDF",
      utilityOther: "Zana na Nyingine",
    },

    footer: {
      about: "Kuhusu",
      contact: "Mawasiliano",
      privacy: "Faragha",
      terms: "Masharti",
      cookies: "Vidakuzi",
      disclaimer: "Kanusho",
      copyright: "© ToolsGift. Haki zote zimehifadhiwa.",
    },

    messages: {
      fileTooLarge: "Faili ni kubwa sana.",
      invalidFile: "Faili si sahihi.",
      unsupportedFormat: "Muundo wa faili hautumiki.",
      uploadFailed: "Upakiaji umeshindwa.",
      processingFailed: "Uchakataji umeshindwa.",
      somethingWentWrong: "Kuna hitilafu. Tafadhali jaribu tena.",
      noFileSelected: "Tafadhali chagua faili kwanza.",
      multipleFilesRequired: "Tafadhali chagua faili nyingi.",
    },
  },
} as const;

const uiBase = {
  badges: {
    image: "Image",
    pdf: "PDF",
    other: "Other",
    generator: "Generator",
    utility: "Utility",
    calculator: "Calculator",
    text: "Text",
  },
  footerLinks: {
    tagline: "Fast & Simple Image Tools.",
    navigation: "Footer navigation",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookiePolicy: "Cookie Policy",
    resetConsent: "Reset Consent Choices",
  },
  consent: {
    title: "We use cookies",
    description:
      "ToolsGift uses necessary cookies to keep the website working. Optional cookies may be used for analytics and advertising. You can choose whether to allow optional cookies.",
    policyLink: "Read our Cookie Policy",
    rejectOptional: "Reject Optional",
    acceptAll: "Accept All",
    managePreferences: "Manage Cookie Preferences",
    preferencesTitle: "Cookie Preferences",
    preferencesDescription:
      "Choose which optional cookies you want to allow. Necessary cookies are always enabled because they support basic website functionality.",
    necessaryTitle: "Necessary Cookies",
    necessaryDescription: "Required for basic website functionality.",
    alwaysOn: "Always On",
    analyticsTitle: "Analytics Cookies",
    analyticsDescription:
      "Help us understand website usage and performance.",
    advertisingTitle: "Advertising Cookies",
    advertisingDescription:
      "May be used to support personalized or measured advertising.",
    resetChoices: "Reset consent choices",
    cancel: "Cancel",
    savePreferences: "Save Preferences",
  },
  related: {
    title: "Related Tools",
    description: "Explore more useful tools for working with your files.",
  },
  notFound: {
    title: "Page not found.",
    description:
      "The page you're looking for doesn't exist, may have been moved, or the link may be incorrect.",
    backHome: "Back to Home",
    exploreTools: "Explore Tools",
  },
};

const uiHi = {
  badges: {
    image: "इमेज",
    pdf: "PDF",
    other: "अन्य",
    generator: "जनरेटर",
    utility: "यूटिलिटी",
    calculator: "कैलकुलेटर",
    text: "टेक्स्ट",
  },
  footerLinks: {
    tagline: "तेज़ और आसान इमेज टूल्स।",
    navigation: "फुटर नेविगेशन",
    aboutUs: "हमारे बारे में",
    contactUs: "संपर्क करें",
    privacyPolicy: "प्राइवेसी पॉलिसी",
    termsOfService: "सेवा की शर्तें",
    cookiePolicy: "कुकी पॉलिसी",
    resetConsent: "सहमति विकल्प रीसेट करें",
  },
  consent: {
    title: "हम कुकीज़ का उपयोग करते हैं",
    description:
      "ToolsGift वेबसाइट को काम करते रखने के लिए आवश्यक कुकीज़ का उपयोग करता है। वैकल्पिक कुकीज़ एनालिटिक्स और विज्ञापन के लिए उपयोग की जा सकती हैं। आप चुन सकते हैं कि वैकल्पिक कुकीज़ की अनुमति देनी है या नहीं।",
    policyLink: "हमारी कुकी पॉलिसी पढ़ें",
    rejectOptional: "वैकल्पिक अस्वीकार करें",
    acceptAll: "सभी स्वीकार करें",
    managePreferences: "कुकी प्राथमिकताएँ प्रबंधित करें",
    preferencesTitle: "कुकी प्राथमिकताएँ",
    preferencesDescription:
      "चुनें कि किन वैकल्पिक कुकीज़ की अनुमति देनी है। आवश्यक कुकीज़ हमेशा सक्षम रहती हैं क्योंकि वे बुनियादी वेबसाइट कार्यक्षमता का समर्थन करती हैं।",
    necessaryTitle: "आवश्यक कुकीज़",
    necessaryDescription: "बुनियादी वेबसाइट कार्यक्षमता के लिए आवश्यक।",
    alwaysOn: "हमेशा चालू",
    analyticsTitle: "एनालिटिक्स कुकीज़",
    analyticsDescription:
      "वेबसाइट उपयोग और प्रदर्शन को समझने में हमारी मदद करें।",
    advertisingTitle: "विज्ञापन कुकीज़",
    advertisingDescription:
      "व्यक्तिगत या मापे गए विज्ञापन का समर्थन करने के लिए उपयोग की जा सकती हैं।",
    resetChoices: "सहमति विकल्प रीसेट करें",
    cancel: "रद्द करें",
    savePreferences: "प्राथमिकताएँ सेव करें",
  },
  related: {
    title: "संबंधित टूल्स",
    description: "अपनी फ़ाइलों के साथ काम करने के लिए और उपयोगी टूल्स देखें।",
  },
  notFound: {
    title: "पेज नहीं मिला।",
    description:
      "जिस पेज को आप खोज रहे हैं वह मौजूद नहीं है, उसे हटाया जा सकता है, या लिंक गलत हो सकता है।",
    backHome: "होम पर वापस जाएँ",
    exploreTools: "टूल्स देखें",
  },
};

const uiEs = {
  badges: {
    image: "Imagen",
    pdf: "PDF",
    other: "Otro",
    generator: "Generador",
    utility: "Utilidad",
    calculator: "Calculadora",
    text: "Texto",
  },
  footerLinks: {
    tagline: "Herramientas de imagen rápidas y sencillas.",
    navigation: "Navegación del pie de página",
    aboutUs: "Sobre nosotros",
    contactUs: "Contáctanos",
    privacyPolicy: "Política de privacidad",
    termsOfService: "Términos del servicio",
    cookiePolicy: "Política de cookies",
    resetConsent: "Restablecer opciones de consentimiento",
  },
  consent: {
    title: "Usamos cookies",
    description:
      "ToolsGift utiliza cookies necesarias para que el sitio web funcione. Las cookies opcionales pueden usarse para análisis y publicidad. Tú decides si quieres permitirlas.",
    policyLink: "Leer nuestra política de cookies",
    rejectOptional: "Rechazar opcionales",
    acceptAll: "Aceptar todas",
    managePreferences: "Gestionar preferencias de cookies",
    preferencesTitle: "Preferencias de cookies",
    preferencesDescription:
      "Elige qué cookies opcionales permites. Las cookies necesarias están siempre activadas porque dan soporte al funcionamiento básico del sitio.",
    necessaryTitle: "Cookies necesarias",
    necessaryDescription: "Requeridas para el funcionamiento básico del sitio web.",
    alwaysOn: "Siempre activas",
    analyticsTitle: "Cookies de análisis",
    analyticsDescription:
      "Nos ayudan a entender el uso y el rendimiento del sitio web.",
    advertisingTitle: "Cookies de publicidad",
    advertisingDescription:
      "Pueden usarse para publicidad personalizada o medición de anuncios.",
    resetChoices: "Restablecer opciones de consentimiento",
    cancel: "Cancelar",
    savePreferences: "Guardar preferencias",
  },
  related: {
    title: "Herramientas relacionadas",
    description: "Explora más herramientas útiles para trabajar con tus archivos.",
  },
  notFound: {
    title: "Página no encontrada.",
    description:
      "La página que buscas no existe, puede haberse movido o el enlace puede ser incorrecto.",
    backHome: "Volver al inicio",
    exploreTools: "Explorar herramientas",
  },
};

const uiFr = {
  badges: {
    image: "Image",
    pdf: "PDF",
    other: "Autre",
    generator: "Générateur",
    utility: "Utilitaire",
    calculator: "Calculateur",
    text: "Texte",
  },
  footerLinks: {
    tagline: "Outils d'image rapides et simples.",
    navigation: "Navigation du pied de page",
    aboutUs: "À propos",
    contactUs: "Contactez-nous",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions d'utilisation",
    cookiePolicy: "Politique de cookies",
    resetConsent: "Réinitialiser les choix de consentement",
  },
  consent: {
    title: "Nous utilisons des cookies",
    description:
      "ToolsGift utilise des cookies nécessaires au bon fonctionnement du site. Des cookies facultatifs peuvent être utilisés à des fins d'analyse et de publicité. Vous pouvez choisir de les autoriser ou non.",
    policyLink: "Lire notre politique de cookies",
    rejectOptional: "Refuser les facultatifs",
    acceptAll: "Tout accepter",
    managePreferences: "Gérer les préférences de cookies",
    preferencesTitle: "Préférences de cookies",
    preferencesDescription:
      "Choisissez les cookies facultatifs que vous souhaitez autoriser. Les cookies nécessaires restent toujours activés car ils assurent le fonctionnement de base du site.",
    necessaryTitle: "Cookies nécessaires",
    necessaryDescription: "Requis pour le fonctionnement de base du site.",
    alwaysOn: "Toujours actifs",
    analyticsTitle: "Cookies d'analyse",
    analyticsDescription:
      "Nous aident à comprendre l'utilisation et les performances du site.",
    advertisingTitle: "Cookies publicitaires",
    advertisingDescription:
      "Peuvent être utilisés pour une publicité personnalisée ou mesurée.",
    resetChoices: "Réinitialiser les choix de consentement",
    cancel: "Annuler",
    savePreferences: "Enregistrer les préférences",
  },
  related: {
    title: "Outils associés",
    description: "Découvrez d'autres outils utiles pour travailler avec vos fichiers.",
  },
  notFound: {
    title: "Page introuvable.",
    description:
      "La page recherchée n'existe pas, a peut-être été déplacée, ou le lien est incorrect.",
    backHome: "Retour à l'accueil",
    exploreTools: "Explorer les outils",
  },
};

const uiDe = {
  badges: {
    image: "Bild",
    pdf: "PDF",
    other: "Sonstiges",
    generator: "Generator",
    utility: "Dienstprogramm",
    calculator: "Rechner",
    text: "Text",
  },
  footerLinks: {
    tagline: "Schnelle und einfache Bildtools.",
    navigation: "Fußzeilen-Navigation",
    aboutUs: "Über uns",
    contactUs: "Kontakt",
    privacyPolicy: "Datenschutzerklärung",
    termsOfService: "Nutzungsbedingungen",
    cookiePolicy: "Cookie-Richtlinie",
    resetConsent: "Einwilligungsoptionen zurücksetzen",
  },
  consent: {
    title: "Wir verwenden Cookies",
    description:
      "ToolsGift verwendet notwendige Cookies, damit die Website funktioniert. Optionale Cookies können für Analyse und Werbung verwendet werden. Sie können wählen, ob Sie optionale Cookies zulassen.",
    policyLink: "Unsere Cookie-Richtlinie lesen",
    rejectOptional: "Optionale ablehnen",
    acceptAll: "Alle akzeptieren",
    managePreferences: "Cookie-Einstellungen verwalten",
    preferencesTitle: "Cookie-Einstellungen",
    preferencesDescription:
      "Wählen Sie aus, welche optionalen Cookies Sie zulassen möchten. Notwendige Cookies sind immer aktiviert, da sie die grundlegende Funktionalität der Website unterstützen.",
    necessaryTitle: "Notwendige Cookies",
    necessaryDescription: "Erforderlich für die grundlegende Funktionalität der Website.",
    alwaysOn: "Immer aktiv",
    analyticsTitle: "Analyse-Cookies",
    analyticsDescription:
      "Helfen uns, Nutzung und Leistung der Website zu verstehen.",
    advertisingTitle: "Werbe-Cookies",
    advertisingDescription:
      "Können für personalisierte oder gemessene Werbung verwendet werden.",
    resetChoices: "Einwilligungsoptionen zurücksetzen",
    cancel: "Abbrechen",
    savePreferences: "Einstellungen speichern",
  },
  related: {
    title: "Verwandte Tools",
    description: "Entdecken Sie weitere nützliche Tools für die Arbeit mit Ihren Dateien.",
  },
  notFound: {
    title: "Seite nicht gefunden.",
    description:
      "Die gesuchte Seite existiert nicht, wurde möglicherweise verschoben oder der Link ist falsch.",
    backHome: "Zurück zur Startseite",
    exploreTools: "Tools durchsuchen",
  },
};

const uiIt = {
  badges: {
    image: "Immagine",
    pdf: "PDF",
    other: "Altro",
    generator: "Generatore",
    utility: "Utilità",
    calculator: "Calcolatrice",
    text: "Testo",
  },
  footerLinks: {
    tagline: "Strumenti per immagini rapidi e semplici.",
    navigation: "Navigazione del piè di pagina",
    aboutUs: "Chi siamo",
    contactUs: "Contattaci",
    privacyPolicy: "Informativa sulla privacy",
    termsOfService: "Termini di servizio",
    cookiePolicy: "Informativa sui cookie",
    resetConsent: "Reimposta le scelte di consenso",
  },
  consent: {
    title: "Usiamo i cookie",
    description:
      "ToolsGift utilizza cookie necessari per far funzionare il sito. I cookie opzionali possono essere usati per analisi e pubblicità. Puoi scegliere se consentire i cookie opzionali.",
    policyLink: "Leggi la nostra informativa sui cookie",
    rejectOptional: "Rifiuta gli opzionali",
    acceptAll: "Accetta tutto",
    managePreferences: "Gestisci le preferenze sui cookie",
    preferencesTitle: "Preferenze sui cookie",
    preferencesDescription:
      "Scegli quali cookie opzionali consentire. I cookie necessari sono sempre attivi perché supportano le funzionalità di base del sito.",
    necessaryTitle: "Cookie necessari",
    necessaryDescription: "Richiesti per il funzionamento di base del sito.",
    alwaysOn: "Sempre attivi",
    analyticsTitle: "Cookie analitici",
    analyticsDescription:
      "Ci aiutano a capire l'uso e le prestazioni del sito.",
    advertisingTitle: "Cookie pubblicitari",
    advertisingDescription:
      "Possono essere usati per pubblicità personalizzata o misurata.",
    resetChoices: "Reimposta le scelte di consenso",
    cancel: "Annulla",
    savePreferences: "Salva le preferenze",
  },
  related: {
    title: "Strumenti correlati",
    description: "Scopri altri strumenti utili per lavorare con i tuoi file.",
  },
  notFound: {
    title: "Pagina non trovata.",
    description:
      "La pagina che cerchi non esiste, potrebbe essere stata spostata oppure il link è errato.",
    backHome: "Torna alla home",
    exploreTools: "Esplora gli strumenti",
  },
};

const uiPt = {
  badges: {
    image: "Imagem",
    pdf: "PDF",
    other: "Outro",
    generator: "Gerador",
    utility: "Utilitário",
    calculator: "Calculadora",
    text: "Texto",
  },
  footerLinks: {
    tagline: "Ferramentas de imagem rápidas e simples.",
    navigation: "Navegação do rodapé",
    aboutUs: "Sobre nós",
    contactUs: "Fale conosco",
    privacyPolicy: "Política de privacidade",
    termsOfService: "Termos de serviço",
    cookiePolicy: "Política de cookies",
    resetConsent: "Redefinir opções de consentimento",
  },
  consent: {
    title: "Usamos cookies",
    description:
      "O ToolsGift usa cookies necessários para manter o site funcionando. Cookies opcionais podem ser usados para análise e publicidade. Você pode escolher se deseja permitir cookies opcionais.",
    policyLink: "Leia nossa política de cookies",
    rejectOptional: "Rejeitar opcionais",
    acceptAll: "Aceitar tudo",
    managePreferences: "Gerenciar preferências de cookies",
    preferencesTitle: "Preferências de cookies",
    preferencesDescription:
      "Escolha quais cookies opcionais deseja permitir. Os cookies necessários ficam sempre ativos porque dão suporte às funções básicas do site.",
    necessaryTitle: "Cookies necessários",
    necessaryDescription: "Necessários para o funcionamento básico do site.",
    alwaysOn: "Sempre ativos",
    analyticsTitle: "Cookies de análise",
    analyticsDescription:
      "Ajudam a entender o uso e o desempenho do site.",
    advertisingTitle: "Cookies de publicidade",
    advertisingDescription:
      "Podem ser usados para publicidade personalizada ou medida.",
    resetChoices: "Redefinir opções de consentimento",
    cancel: "Cancelar",
    savePreferences: "Salvar preferências",
  },
  related: {
    title: "Ferramentas relacionadas",
    description: "Explore mais ferramentas úteis para trabalhar com seus arquivos.",
  },
  notFound: {
    title: "Página não encontrada.",
    description:
      "A página que você procura não existe, pode ter sido movida ou o link pode estar incorreto.",
    backHome: "Voltar ao início",
    exploreTools: "Explorar ferramentas",
  },
};

const uiJa = {
  badges: {
    image: "画像",
    pdf: "PDF",
    other: "その他",
    generator: "ジェネレーター",
    utility: "ユーティリティ",
    calculator: "電卓",
    text: "テキスト",
  },
  footerLinks: {
    tagline: "高速でシンプルな画像ツール。",
    navigation: "フッターナビゲーション",
    aboutUs: "会社概要",
    contactUs: "お問い合わせ",
    privacyPolicy: "プライバシーポリシー",
    termsOfService: "利用規約",
    cookiePolicy: "Cookie ポリシー",
    resetConsent: "同意設定をリセット",
  },
  consent: {
    title: "Cookie を使用しています",
    description:
      "ToolsGift はウェブサイトを機能させるため、必要な Cookie を使用します。オプションの Cookie は分析や広告に使用される場合があります。オプションの Cookie を許可するかどうかを選択できます。",
    policyLink: "Cookie ポリシーを読む",
    rejectOptional: "オプションを拒否",
    acceptAll: "すべて許可",
    managePreferences: "Cookie 設定を管理",
    preferencesTitle: "Cookie 設定",
    preferencesDescription:
      "許可するオプションの Cookie を選択してください。必要な Cookie はウェブサイトの基本機能を支えるため常に有効です。",
    necessaryTitle: "必要な Cookie",
    necessaryDescription: "ウェブサイトの基本機能に必要です。",
    alwaysOn: "常にオン",
    analyticsTitle: "分析 Cookie",
    analyticsDescription:
      "ウェブサイトの利用状況とパフォーマンスの把握に役立ちます。",
    advertisingTitle: "広告 Cookie",
    advertisingDescription:
      "パーソナライズされた、または測定された広告に使用される場合があります。",
    resetChoices: "同意設定をリセット",
    cancel: "キャンセル",
    savePreferences: "設定を保存",
  },
  related: {
    title: "関連ツール",
    description: "ファイル作業に役立つ他の便利なツールをチェックしましょう。",
  },
  notFound: {
    title: "ページが見つかりません。",
    description:
      "お探しのページは存在しないか、移動されたか、リンクが間違っている可能性があります。",
    backHome: "ホームに戻る",
    exploreTools: "ツールを見る",
  },
};

const uiRu = {
  badges: {
    image: "Изображение",
    pdf: "PDF",
    other: "Другое",
    generator: "Генератор",
    utility: "Утилита",
    calculator: "Калькулятор",
    text: "Текст",
  },
  footerLinks: {
    tagline: "Быстрые и простые инструменты для изображений.",
    navigation: "Навигация по нижнему колонтитулу",
    aboutUs: "О нас",
    contactUs: "Связаться с нами",
    privacyPolicy: "Политика конфиденциальности",
    termsOfService: "Условия использования",
    cookiePolicy: "Политика использования файлов cookie",
    resetConsent: "Сбросить настройки согласия",
  },
  consent: {
    title: "Мы используем файлы cookie",
    description:
      "ToolsGift использует необходимые файлы cookie для работы сайта. Дополнительные файлы cookie могут использоваться для аналитики и рекламы. Вы можете выбрать, разрешать ли дополнительные файлы cookie.",
    policyLink: "Прочитать нашу политику использования файлов cookie",
    rejectOptional: "Отклонить дополнительные",
    acceptAll: "Принять все",
    managePreferences: "Управление настройками cookie",
    preferencesTitle: "Настройки cookie",
    preferencesDescription:
      "Выберите, какие дополнительные файлы cookie разрешить. Необходимые файлы cookie всегда включены, так как они обеспечивают основную функциональность сайта.",
    necessaryTitle: "Необходимые файлы cookie",
    necessaryDescription: "Требуются для основной функциональности сайта.",
    alwaysOn: "Всегда включены",
    analyticsTitle: "Аналитические файлы cookie",
    analyticsDescription:
      "Помогают нам понимать использование и производительность сайта.",
    advertisingTitle: "Рекламные файлы cookie",
    advertisingDescription:
      "Могут использоваться для персонализированной или измеряемой рекламы.",
    resetChoices: "Сбросить настройки согласия",
    cancel: "Отмена",
    savePreferences: "Сохранить настройки",
  },
  related: {
    title: "Похожие инструменты",
    description: "Откройте другие полезные инструменты для работы с файлами.",
  },
  notFound: {
    title: "Страница не найдена.",
    description:
      "Страница, которую вы ищете, не существует, могла быть перемещена или ссылка может быть неверной.",
    backHome: "Вернуться на главную",
    exploreTools: "Просмотреть инструменты",
  },
};

const uiKo = {
  badges: {
    image: "이미지",
    pdf: "PDF",
    other: "기타",
    generator: "생성기",
    utility: "유틸리티",
    calculator: "계산기",
    text: "텍스트",
  },
  footerLinks: {
    tagline: "빠르고 간단한 이미지 도구.",
    navigation: "바닥글 탐색",
    aboutUs: "회사 소개",
    contactUs: "문의하기",
    privacyPolicy: "개인정보 처리방침",
    termsOfService: "서비스 이용약관",
    cookiePolicy: "쿠키 정책",
    resetConsent: "동의 선택 초기화",
  },
  consent: {
    title: "쿠키를 사용합니다",
    description:
      "ToolsGift는 웹사이트가 작동하도록 필요한 쿠키를 사용합니다. 선택 쿠키는 분석 및 광고에 사용될 수 있습니다. 선택 쿠키 허용 여부를 결정할 수 있습니다.",
    policyLink: "쿠키 정책 읽기",
    rejectOptional: "선택 거부",
    acceptAll: "모두 허용",
    managePreferences: "쿠키 환경설정 관리",
    preferencesTitle: "쿠키 환경설정",
    preferencesDescription:
      "허용할 선택 쿠키를 선택하세요. 필수 쿠키는 웹사이트 기본 기능을 지원하므로 항상 활성화됩니다.",
    necessaryTitle: "필수 쿠키",
    necessaryDescription: "웹사이트 기본 기능에 필요합니다.",
    alwaysOn: "항상 사용",
    analyticsTitle: "분석 쿠키",
    analyticsDescription:
      "웹사이트 사용 및 성능을 이해하는 데 도움이 됩니다.",
    advertisingTitle: "광고 쿠키",
    advertisingDescription:
      "맞춤 또는 측정 광고를 지원하는 데 사용될 수 있습니다.",
    resetChoices: "동의 선택 초기화",
    cancel: "취소",
    savePreferences: "환경설정 저장",
  },
  related: {
    title: "관련 도구",
    description: "파일 작업에 유용한 더 많은 도구를 살펴보세요.",
  },
  notFound: {
    title: "페이지를 찾을 수 없습니다.",
    description:
      "찾고 있는 페이지가 존재하지 않거나, 이동되었거나, 링크가 잘못되었을 수 있습니다.",
    backHome: "홈으로 돌아가기",
    exploreTools: "도구 둘러보기",
  },
};

const uiZhCn = {
  badges: {
    image: "图片",
    pdf: "PDF",
    other: "其他",
    generator: "生成器",
    utility: "工具",
    calculator: "计算器",
    text: "文本",
  },
  footerLinks: {
    tagline: "快速简单的图片工具。",
    navigation: "页脚导航",
    aboutUs: "关于我们",
    contactUs: "联系我们",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
    cookiePolicy: "Cookie 政策",
    resetConsent: "重置同意选项",
  },
  consent: {
    title: "我们使用 Cookie",
    description:
      "ToolsGift 使用必要的 Cookie 来维持网站正常运行。可选 Cookie 可能用于分析和广告。您可以选择是否允许可选 Cookie。",
    policyLink: "阅读我们的 Cookie 政策",
    rejectOptional: "拒绝可选",
    acceptAll: "全部接受",
    managePreferences: "管理 Cookie 偏好设置",
    preferencesTitle: "Cookie 偏好设置",
    preferencesDescription:
      "选择您希望允许的可选 Cookie。必要 Cookie 始终启用，因为它们支撑网站的基本功能。",
    necessaryTitle: "必要 Cookie",
    necessaryDescription: "网站基本功能所需。",
    alwaysOn: "始终开启",
    analyticsTitle: "分析 Cookie",
    analyticsDescription:
      "帮助我们了解网站的使用情况和性能。",
    advertisingTitle: "广告 Cookie",
    advertisingDescription:
      "可能用于支持个性化或衡量广告效果。",
    resetChoices: "重置同意选项",
    cancel: "取消",
    savePreferences: "保存偏好设置",
  },
  related: {
    title: "相关工具",
    description: "探索更多有助于处理文件的实用工具。",
  },
  notFound: {
    title: "页面未找到。",
    description:
      "您查找的页面不存在、可能已被移动，或链接有误。",
    backHome: "返回首页",
    exploreTools: "浏览工具",
  },
};

const uiZhTw = {
  badges: {
    image: "圖片",
    pdf: "PDF",
    other: "其他",
    generator: "產生器",
    utility: "工具",
    calculator: "計算機",
    text: "文字",
  },
  footerLinks: {
    tagline: "快速簡單的圖片工具。",
    navigation: "頁尾導覽",
    aboutUs: "關於我們",
    contactUs: "聯絡我們",
    privacyPolicy: "隱私權政策",
    termsOfService: "服務條款",
    cookiePolicy: "Cookie 政策",
    resetConsent: "重設同意選項",
  },
  consent: {
    title: "我們使用 Cookie",
    description:
      "ToolsGift 使用必要的 Cookie 來維持網站正常運作。選用 Cookie 可能用於分析和廣告。您可以選擇是否允許選用 Cookie。",
    policyLink: "閱讀我們的 Cookie 政策",
    rejectOptional: "拒絕選用",
    acceptAll: "全部接受",
    managePreferences: "管理 Cookie 偏好設定",
    preferencesTitle: "Cookie 偏好設定",
    preferencesDescription:
      "選擇您要允許的選用 Cookie。必要的 Cookie 一律啟用，因為它們支撐網站的基本功能。",
    necessaryTitle: "必要 Cookie",
    necessaryDescription: "網站基本功能所需。",
    alwaysOn: "始終啟用",
    analyticsTitle: "分析 Cookie",
    analyticsDescription:
      "協助我們了解網站的使用情況與效能。",
    advertisingTitle: "廣告 Cookie",
    advertisingDescription:
      "可能用於支援個人化或衡量廣告。",
    resetChoices: "重設同意選項",
    cancel: "取消",
    savePreferences: "儲存偏好設定",
  },
  related: {
    title: "相關工具",
    description: "探索更多處理檔案時可用的實用工具。",
  },
  notFound: {
    title: "找不到頁面。",
    description:
      "您要找的頁面不存在、可能已被移動，或連結可能有誤。",
    backHome: "返回首頁",
    exploreTools: "瀏覽工具",
  },
};

const uiAr = {
  badges: {
    image: "صورة",
    pdf: "PDF",
    other: "أخرى",
    generator: "مولّد",
    utility: "أداة مساعدة",
    calculator: "حاسبة",
    text: "نص",
  },
  footerLinks: {
    tagline: "أدوات صور سريعة وبسيطة.",
    navigation: "تنقّل التذييل",
    aboutUs: "من نحن",
    contactUs: "اتصل بنا",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    cookiePolicy: "سياسة ملفات تعريف الارتباط",
    resetConsent: "إعادة تعيين خيارات الموافقة",
  },
  consent: {
    title: "نستخدم ملفات تعريف الارتباط",
    description:
      "يستخدم ToolsGift ملفات تعريف الارتباط الضرورية لإبقاء الموقع يعمل. قد تُستخدم ملفات تعريف الارتباط الاختيارية لأغراض التحليلات والإعلان. يمكنك اختيار السماح بملفات تعريف الارتباط الاختيارية أم لا.",
    policyLink: "اقرأ سياسة ملفات تعريف الارتباط",
    rejectOptional: "رفض الاختيارية",
    acceptAll: "قبول الكل",
    managePreferences: "إدارة تفضيلات ملفات تعريف الارتباط",
    preferencesTitle: "تفضيلات ملفات تعريف الارتباط",
    preferencesDescription:
      "اختر ملفات تعريف الارتباط الاختيارية التي تريد السماح بها. تُفعَّل ملفات تعريف الارتباط الضرورية دائمًا لأنها تدعم الوظائف الأساسية للموقع.",
    necessaryTitle: "ملفات تعريف الارتباط الضرورية",
    necessaryDescription: "مطلوبة للوظائف الأساسية للموقع.",
    alwaysOn: "مفعّلة دائمًا",
    analyticsTitle: "ملفات تعريف الارتباط التحليلية",
    analyticsDescription:
      "تساعدنا على فهم استخدام الموقع وأدائه.",
    advertisingTitle: "ملفات تعريف الارتباط الإعلانية",
    advertisingDescription:
      "قد تُستخدم لدعم الإعلانات المخصصة أو المقيسة.",
    resetChoices: "إعادة تعيين خيارات الموافقة",
    cancel: "إلغاء",
    savePreferences: "حفظ التفضيلات",
  },
  related: {
    title: "أدوات ذات صلة",
    description: "استكشف المزيد من الأدوات المفيدة للعمل مع ملفاتك.",
  },
  notFound: {
    title: "الصفحة غير موجودة.",
    description:
      "الصفحة التي تبحث عنها غير موجودة، أو ربما نُقلت، أو قد يكون الرابط غير صحيح.",
    backHome: "العودة إلى الرئيسية",
    exploreTools: "استعراض الأدوات",
  },
};

const uiBg = {
  badges: {
    image: "Изображение",
    pdf: "PDF",
    other: "Друго",
    generator: "Генератор",
    utility: "Помощна програма",
    calculator: "Калкулатор",
    text: "Текст",
  },
  footerLinks: {
    tagline: "Бързи и лесни инструменти за изображения.",
    navigation: "Навигация в долния колонтитул",
    aboutUs: "За нас",
    contactUs: "Свържете се с нас",
    privacyPolicy: "Политика за поверителност",
    termsOfService: "Условия за ползване",
    cookiePolicy: "Политика за бисквитките",
    resetConsent: "Нулиране на изборите за съгласие",
  },
  consent: {
    title: "Използваме бисквитки",
    description:
      "ToolsGift използва необходимите бисквитки, за да работи уебсайтът. Допълнителни бисквитки могат да се използват за анализи и реклама. Вие решавате дали да разрешите допълнителните бисквитки.",
    policyLink: "Прочетете нашата политика за бисквитките",
    rejectOptional: "Отхвърляне на допълнителните",
    acceptAll: "Приемане на всички",
    managePreferences: "Управление на предпочитанията за бисквитки",
    preferencesTitle: "Предпочитания за бисквитки",
    preferencesDescription:
      "Изберете кои допълнителни бисквитки да разрешите. Необходимите бисквитки винаги са включени, защото поддържат основните функции на сайта.",
    necessaryTitle: "Необходими бисквитки",
    necessaryDescription: "Изискват се за основните функции на сайта.",
    alwaysOn: "Винаги включени",
    analyticsTitle: "Аналитични бисквитки",
    analyticsDescription:
      "Помагат ни да разберем използването и представянето на сайта.",
    advertisingTitle: "Рекламни бисквитки",
    advertisingDescription:
      "Могат да се използват за персонализирана или измерена реклама.",
    resetChoices: "Нулиране на изборите за съгласие",
    cancel: "Отказ",
    savePreferences: "Запазване на предпочитанията",
  },
  related: {
    title: "Подобни инструменти",
    description: "Разгледайте още полезни инструменти за работа с файлове.",
  },
  notFound: {
    title: "Страницата не е намерена.",
    description:
      "Страницата, която търсите, не съществува, вероятно е преместена или връзката е грешна.",
    backHome: "Обратно към началото",
    exploreTools: "Разгледайте инструментите",
  },
};

const uiCa = {
  badges: {
    image: "Imatge",
    pdf: "PDF",
    other: "Altres",
    generator: "Generador",
    utility: "Utilitat",
    calculator: "Calculadora",
    text: "Text",
  },
  footerLinks: {
    tagline: "Eines d'imatge ràpides i senzilles.",
    navigation: "Navegació del peu de pàgina",
    aboutUs: "Sobre nosaltres",
    contactUs: "Contacteu-nos",
    privacyPolicy: "Política de privadesa",
    termsOfService: "Termes del servei",
    cookiePolicy: "Política de cookies",
    resetConsent: "Restableix les opcions de consentiment",
  },
  consent: {
    title: "Utilitzem cookies",
    description:
      "ToolsGift utilitza cookies necessàries perquè el lloc web funcioni. Les cookies opcionals es poden utilitzar per a anàlisi i publicitat. Podeu triar si voleu permetre les cookies opcionals.",
    policyLink: "Llegiu la nostra política de cookies",
    rejectOptional: "Rebutja les opcionals",
    acceptAll: "Accepta-ho tot",
    managePreferences: "Gestiona les preferències de cookies",
    preferencesTitle: "Preferències de cookies",
    preferencesDescription:
      "Trieu quines cookies opcionals voleu permetre. Les cookies necessàries sempre estan activades perquè donen suport al funcionament bàsic del lloc web.",
    necessaryTitle: "Cookies necessàries",
    necessaryDescription: "Requerides per al funcionament bàsic del lloc web.",
    alwaysOn: "Sempre actives",
    analyticsTitle: "Cookies d'anàlisi",
    analyticsDescription:
      "Ens ajuden a entendre l'ús i el rendiment del lloc web.",
    advertisingTitle: "Cookies publicitàries",
    advertisingDescription:
      "Es poden utilitzar per donar suport a publicitat personalitzada o mesurada.",
    resetChoices: "Restableix les opcions de consentiment",
    cancel: "Cancel·la",
    savePreferences: "Desa les preferències",
  },
  related: {
    title: "Eines relacionades",
    description: "Exploreu més eines útils per treballar amb els vostres fitxers.",
  },
  notFound: {
    title: "Pàgina no trobada.",
    description:
      "La pàgina que busqueu no existeix, s'ha pogut moure o l'enllaç pot ser incorrecte.",
    backHome: "Torna a l'inici",
    exploreTools: "Explora les eines",
  },
};

const uiNl = {
  badges: {
    image: "Afbeelding",
    pdf: "PDF",
    other: "Overig",
    generator: "Generator",
    utility: "Hulpprogramma",
    calculator: "Rekenmachine",
    text: "Tekst",
  },
  footerLinks: {
    tagline: "Snelle en eenvoudige beeldtools.",
    navigation: "Voetnavigatie",
    aboutUs: "Over ons",
    contactUs: "Neem contact op",
    privacyPolicy: "Privacybeleid",
    termsOfService: "Servicevoorwaarden",
    cookiePolicy: "Cookiebeleid",
    resetConsent: "Toestemmingskeuzes resetten",
  },
  consent: {
    title: "Wij gebruiken cookies",
    description:
      "ToolsGift gebruikt noodzakelijke cookies om de website te laten werken. Optionele cookies kunnen worden gebruikt voor analyses en advertenties. U kunt kiezen of u optionele cookies wilt toestaan.",
    policyLink: "Lees ons cookiebeleid",
    rejectOptional: "Optionele weigeren",
    acceptAll: "Alles accepteren",
    managePreferences: "Cookievoorkeuren beheren",
    preferencesTitle: "Cookievoorkeuren",
    preferencesDescription:
      "Kies welke optionele cookies u wilt toestaan. Noodzakelijke cookies zijn altijd ingeschakeld omdat zij de basisfunctionaliteit van de website ondersteunen.",
    necessaryTitle: "Noodzakelijke cookies",
    necessaryDescription: "Vereist voor de basisfunctionaliteit van de website.",
    alwaysOn: "Altijd aan",
    analyticsTitle: "Analytische cookies",
    analyticsDescription:
      "Helpen ons het gebruik en de prestaties van de website te begrijpen.",
    advertisingTitle: "Advertentiecookies",
    advertisingDescription:
      "Kunnen worden gebruikt voor gepersonaliseerde of gemeten advertenties.",
    resetChoices: "Toestemmingskeuzes resetten",
    cancel: "Annuleren",
    savePreferences: "Voorkeuren opslaan",
  },
  related: {
    title: "Gerelateerde tools",
    description: "Ontdek meer handige tools om met uw bestanden te werken.",
  },
  notFound: {
    title: "Pagina niet gevonden.",
    description:
      "De pagina die u zoekt bestaat niet, is mogelijk verplaatst of de link is niet juist.",
    backHome: "Terug naar home",
    exploreTools: "Tools verkennen",
  },
};

const uiEl = {
  badges: {
    image: "Εικόνα",
    pdf: "PDF",
    other: "Άλλο",
    generator: "Γεννήτρια",
    utility: "Βοηθητικό εργαλείο",
    calculator: "Αριθμομηχανή",
    text: "Κείμενο",
  },
  footerLinks: {
    tagline: "Γρήγορα και απλά εργαλεία εικόνας.",
    navigation: "Πλοήγηση υποσέλιδου",
    aboutUs: "Σχετικά με εμάς",
    contactUs: "Επικοινωνήστε μαζί μας",
    privacyPolicy: "Πολιτική απορρήτου",
    termsOfService: "Όροι χρήσης",
    cookiePolicy: "Πολιτική cookies",
    resetConsent: "Επαναφορά επιλογών συναίνεσης",
  },
  consent: {
    title: "Χρησιμοποιούμε cookies",
    description:
      "Το ToolsGift χρησιμοποιεί απαραίτητα cookies για να λειτουργεί ο ιστότοπος. Προαιρετικά cookies μπορεί να χρησιμοποιηθούν για αναλυτικά και διαφημίσεις. Μπορείτε να επιλέξετε εάν επιτρέπετε τα προαιρετικά cookies.",
    policyLink: "Διαβάστε την πολιτική cookies μας",
    rejectOptional: "Απόρριψη προαιρετικών",
    acceptAll: "Αποδοχή όλων",
    managePreferences: "Διαχείριση προτιμήσεων cookies",
    preferencesTitle: "Προτιμήσεις cookies",
    preferencesDescription:
      "Επιλέξτε ποια προαιρετικά cookies θέλετε να επιτρέψετε. Τα απαραίτητα cookies είναι πάντα ενεργά επειδή υποστηρίζουν τη βασική λειτουργία του ιστότοπου.",
    necessaryTitle: "Απαραίτητα cookies",
    necessaryDescription: "Απαιτούνται για τη βασική λειτουργία του ιστότοπου.",
    alwaysOn: "Πάντα ενεργά",
    analyticsTitle: "Αναλυτικά cookies",
    analyticsDescription:
      "Μας βοηθούν να κατανοήσουμε τη χρήση και την απόδοση του ιστότοπου.",
    advertisingTitle: "Διαφημιστικά cookies",
    advertisingDescription:
      "Μπορεί να χρησιμοποιηθούν για εξατομικευμένες ή μετρούμενες διαφημίσεις.",
    resetChoices: "Επαναφορά επιλογών συναίνεσης",
    cancel: "Ακύρωση",
    savePreferences: "Αποθήκευση προτιμήσεων",
  },
  related: {
    title: "Σχετικά εργαλεία",
    description: "Εξερευνήστε περισσότερα χρήσιμα εργαλεία για την εργασία με τα αρχεία σας.",
  },
  notFound: {
    title: "Η σελίδα δεν βρέθηκε.",
    description:
      "Η σελίδα που ψάχνετε δεν υπάρχει, μπορεί να έχει μετακινηθεί ή ο σύνδεσμος μπορεί να είναι λάθος.",
    backHome: "Επιστροφή στην αρχική",
    exploreTools: "Εξερεύνηση εργαλείων",
  },
};

const uiId = {
  badges: {
    image: "Gambar",
    pdf: "PDF",
    other: "Lainnya",
    generator: "Generator",
    utility: "Utilitas",
    calculator: "Kalkulator",
    text: "Teks",
  },
  footerLinks: {
    tagline: "Alat gambar yang cepat dan sederhana.",
    navigation: "Navigasi bawah halaman",
    aboutUs: "Tentang Kami",
    contactUs: "Hubungi Kami",
    privacyPolicy: "Kebijakan Privasi",
    termsOfService: "Ketentuan Layanan",
    cookiePolicy: "Kebijakan Cookie",
    resetConsent: "Atur Ulang Pilihan Persetujuan",
  },
  consent: {
    title: "Kami menggunakan cookie",
    description:
      "ToolsGift menggunakan cookie yang diperlukan agar situs web berfungsi. Cookie opsional dapat digunakan untuk analitik dan iklan. Anda dapat memilih apakah ingin mengizinkan cookie opsional.",
    policyLink: "Baca Kebijakan Cookie kami",
    rejectOptional: "Tolak Opsional",
    acceptAll: "Terima Semua",
    managePreferences: "Kelola Preferensi Cookie",
    preferencesTitle: "Preferensi Cookie",
    preferencesDescription:
      "Pilih cookie opsional yang ingin Anda izinkan. Cookie yang diperlukan selalu aktif karena mendukung fungsi dasar situs web.",
    necessaryTitle: "Cookie yang Diperlukan",
    necessaryDescription: "Diperlukan untuk fungsi dasar situs web.",
    alwaysOn: "Selalu Aktif",
    analyticsTitle: "Cookie Analitik",
    analyticsDescription:
      "Membantu kami memahami penggunaan dan kinerja situs web.",
    advertisingTitle: "Cookie Iklan",
    advertisingDescription:
      "Dapat digunakan untuk mendukung iklan yang dipersonalisasi atau terukur.",
    resetChoices: "Atur ulang pilihan persetujuan",
    cancel: "Batal",
    savePreferences: "Simpan Preferensi",
  },
  related: {
    title: "Alat Terkait",
    description: "Jelajahi lebih banyak alat berguna untuk bekerja dengan file Anda.",
  },
  notFound: {
    title: "Halaman tidak ditemukan.",
    description:
      "Halaman yang Anda cari tidak ada, mungkin telah dipindahkan, atau tautannya salah.",
    backHome: "Kembali ke Beranda",
    exploreTools: "Jelajahi Alat",
  },
};

const uiMs = {
  badges: {
    image: "Imej",
    pdf: "PDF",
    other: "Lain",
    generator: "Penjana",
    utility: "Utiliti",
    calculator: "Kalkulator",
    text: "Teks",
  },
  footerLinks: {
    tagline: "Alat imej yang pantas dan mudah.",
    navigation: "Navigasi pengaki",
    aboutUs: "Tentang Kami",
    contactUs: "Hubungi Kami",
    privacyPolicy: "Dasar Privasi",
    termsOfService: "Terma Perkhidmatan",
    cookiePolicy: "Dasar Kuki",
    resetConsent: "Tetapkan Semula Pilihan Kebenaran",
  },
  consent: {
    title: "Kami menggunakan kuki",
    description:
      "ToolsGift menggunakan kuki yang perlu untuk memastikan laman web berfungsi. Kuki pilihan mungkin digunakan untuk analitik dan iklan. Anda boleh memilih sama ada untuk membenarkan kuki pilihan.",
    policyLink: "Baca Dasar Kuki kami",
    rejectOptional: "Tolak Pilihan",
    acceptAll: "Terima Semua",
    managePreferences: "Urus Keutamaan Kuki",
    preferencesTitle: "Keutamaan Kuki",
    preferencesDescription:
      "Pilih kuki pilihan yang anda mahu benarkan. Kuki perlu sentiasa diaktifkan kerana ia menyokong fungsi asas laman web.",
    necessaryTitle: "Kuki Perlu",
    necessaryDescription: "Diperlukan untuk fungsi asas laman web.",
    alwaysOn: "Sentiasa Aktif",
    analyticsTitle: "Kuki Analitik",
    analyticsDescription:
      "Membantu kami memahami penggunaan dan prestasi laman web.",
    advertisingTitle: "Kuki Iklan",
    advertisingDescription:
      "Mungkin digunakan untuk menyokong iklan yang diperibadikan atau diukur.",
    resetChoices: "Tetapkan semula pilihan kebenaran",
    cancel: "Batal",
    savePreferences: "Simpan Keutamaan",
  },
  related: {
    title: "Alat Berkaitan",
    description: "Terokai lebih banyak alat berguna untuk berurusan dengan fail anda.",
  },
  notFound: {
    title: "Halaman tidak ditemui.",
    description:
      "Halaman yang anda cari tidak wujud, mungkin telah dipindahkan, atau pautan mungkin salah.",
    backHome: "Kembali ke Laman Utama",
    exploreTools: "Terokai Alat",
  },
};

const uiPl = {
  badges: {
    image: "Obraz",
    pdf: "PDF",
    other: "Inne",
    generator: "Generator",
    utility: "Narzędzie",
    calculator: "Kalkulator",
    text: "Tekst",
  },
  footerLinks: {
    tagline: "Szybkie i proste narzędzia do obrazów.",
    navigation: "Nawigacja w stopce",
    aboutUs: "O nas",
    contactUs: "Skontaktuj się",
    privacyPolicy: "Polityka prywatności",
    termsOfService: "Warunki korzystania z usługi",
    cookiePolicy: "Polityka cookies",
    resetConsent: "Zresetuj wybory zgody",
  },
  consent: {
    title: "Używamy plików cookies",
    description:
      "ToolsGift używa niezbędnych plików cookies, aby strona działała. Opcjonalne pliki cookies mogą być używane do analiz i reklam. Możesz wybrać, czy chcesz zezwolić na opcjonalne pliki cookies.",
    policyLink: "Przeczytaj naszą politykę cookies",
    rejectOptional: "Odrzuć opcjonalne",
    acceptAll: "Zaakceptuj wszystkie",
    managePreferences: "Zarządzaj preferencjami cookies",
    preferencesTitle: "Preferencje cookies",
    preferencesDescription:
      "Wybierz, które opcjonalne pliki cookies chcesz zezwolić. Niezbędne pliki cookies są zawsze włączone, ponieważ wspierają podstawowe funkcje strony.",
    necessaryTitle: "Niezbędne pliki cookies",
    necessaryDescription: "Wymagane do podstawowego działania strony.",
    alwaysOn: "Zawsze włączone",
    analyticsTitle: "Analityczne pliki cookies",
    analyticsDescription:
      "Pomagają nam zrozumieć sposób korzystania ze strony i jej wydajność.",
    advertisingTitle: "Reklamowe pliki cookies",
    advertisingDescription:
      "Mogą być używane do wspierania spersonalizowanych lub mierzonych reklam.",
    resetChoices: "Zresetuj wybory zgody",
    cancel: "Anuluj",
    savePreferences: "Zapisz preferencje",
  },
  related: {
    title: "Powiązane narzędzia",
    description: "Poznaj więcej przydatnych narzędzi do pracy z plikami.",
  },
  notFound: {
    title: "Nie znaleziono strony.",
    description:
      "Strona, której szukasz, nie istnieje, mogła zostać przeniesiona lub link jest nieprawidłowy.",
    backHome: "Wróć do strony głównej",
    exploreTools: "Przeglądaj narzędzia",
  },
};

const uiSv = {
  badges: {
    image: "Bild",
    pdf: "PDF",
    other: "Övrigt",
    generator: "Generator",
    utility: "Verktyg",
    calculator: "Miniräknare",
    text: "Text",
  },
  footerLinks: {
    tagline: "Snabba och enkla bildverktyg.",
    navigation: "Sidfotsnavigering",
    aboutUs: "Om oss",
    contactUs: "Kontakta oss",
    privacyPolicy: "Integritetspolicy",
    termsOfService: "Användarvillkor",
    cookiePolicy: "Cookiepolicy",
    resetConsent: "Återställ samtyckesval",
  },
  consent: {
    title: "Vi använder cookies",
    description:
      "ToolsGift använder nödvändiga cookies för att webbplatsen ska fungera. Valfria cookies kan användas för analys och annonsering. Du kan välja om du vill tillåta valfria cookies.",
    policyLink: "Läs vår cookiepolicy",
    rejectOptional: "Avvisa valfria",
    acceptAll: "Acceptera alla",
    managePreferences: "Hantera cookieinställningar",
    preferencesTitle: "Cookieinställningar",
    preferencesDescription:
      "Välj vilka valfria cookies du vill tillåta. Nödvändiga cookies är alltid aktiva eftersom de stödjer webbplatsens grundläggande funktionalitet.",
    necessaryTitle: "Nödvändiga cookies",
    necessaryDescription: "Krävs för webbplatsens grundläggande funktionalitet.",
    alwaysOn: "Alltid aktiva",
    analyticsTitle: "Analytiska cookies",
    analyticsDescription:
      "Hjälper oss förstå webbplatsens användning och prestanda.",
    advertisingTitle: "Annonscookies",
    advertisingDescription:
      "Kan användas för personanpassad eller mätbar annonsering.",
    resetChoices: "Återställ samtyckesval",
    cancel: "Avbryt",
    savePreferences: "Spara inställningar",
  },
  related: {
    title: "Relaterade verktyg",
    description: "Utforska fler användbara verktyg för att arbeta med dina filer.",
  },
  notFound: {
    title: "Sidan hittades inte.",
    description:
      "Sidan du söker finns inte, kan ha flyttats eller så kan länken vara felaktig.",
    backHome: "Tillbaka till startsidan",
    exploreTools: "Utforska verktyg",
  },
};

const uiTh = {
  badges: {
    image: "รูปภาพ",
    pdf: "PDF",
    other: "อื่นๆ",
    generator: "ตัวสร้าง",
    utility: "ยูทิลิตี้",
    calculator: "เครื่องคิดเลข",
    text: "ข้อความ",
  },
  footerLinks: {
    tagline: "เครื่องมือรูปภาพที่รวดเร็วและเรียบง่าย",
    navigation: "การนำทางส่วนท้าย",
    aboutUs: "เกี่ยวกับเรา",
    contactUs: "ติดต่อเรา",
    privacyPolicy: "นโยบายความเป็นส่วนตัว",
    termsOfService: "ข้อกำหนดการให้บริการ",
    cookiePolicy: "นโยบายคุกกี้",
    resetConsent: "รีเซ็ตตัวเลือกความยินยอม",
  },
  consent: {
    title: "เราใช้คุกกี้",
    description:
      "ToolsGift ใช้คุกกี้ที่จำเป็นเพื่อให้เว็บไซต์ทำงานได้ คุกกี้ที่เป็นทางเลือกอาจใช้เพื่อการวิเคราะห์และโฆษณา คุณสามารถเลือกได้ว่าจะอนุญาตคุกกี้ทางเลือกหรือไม่",
    policyLink: "อ่านนโยบายคุกกี้ของเรา",
    rejectOptional: "ปฏิเสธตัวเลือก",
    acceptAll: "ยอมรับทั้งหมด",
    managePreferences: "จัดการการตั้งค่าคุกกี้",
    preferencesTitle: "การตั้งค่าคุกกี้",
    preferencesDescription:
      "เลือกคุกกี้ทางเลือกที่คุณต้องการอนุญาต คุกกี้ที่จำเป็นจะเปิดใช้งานเสมอเนื่องจากรองรับฟังก์ชันพื้นฐานของเว็บไซต์",
    necessaryTitle: "คุกกี้ที่จำเป็น",
    necessaryDescription: "จำเป็นสำหรับฟังก์ชันพื้นฐานของเว็บไซต์",
    alwaysOn: "เปิดเสมอ",
    analyticsTitle: "คุกกี้วิเคราะห์",
    analyticsDescription:
      "ช่วยให้เราเข้าใจการใช้งานและประสิทธิภาพของเว็บไซต์",
    advertisingTitle: "คุกกี้โฆษณา",
    advertisingDescription:
      "อาจใช้เพื่อสนับสนุนโฆษณาแบบเฉพาะบุคคลหรือแบบวัดผล",
    resetChoices: "รีเซ็ตตัวเลือกความยินยอม",
    cancel: "ยกเลิก",
    savePreferences: "บันทึกการตั้งค่า",
  },
  related: {
    title: "เครื่องมือที่เกี่ยวข้อง",
    description: "สำรวจเครื่องมือที่มีประโยชน์เพิ่มเติมสำหรับการทำงานกับไฟล์ของคุณ",
  },
  notFound: {
    title: "ไม่พบหน้า",
    description:
      "หน้าที่คุณกำลังมองหาไม่มีอยู่ อาจถูกย้าย หรือลิงก์อาจไม่ถูกต้อง",
    backHome: "กลับไปหน้าแรก",
    exploreTools: "สำรวจเครื่องมือ",
  },
};

const uiTr = {
  badges: {
    image: "Görsel",
    pdf: "PDF",
    other: "Diğer",
    generator: "Oluşturucu",
    utility: "Yardımcı Araç",
    calculator: "Hesap Makinesi",
    text: "Metin",
  },
  footerLinks: {
    tagline: "Hızlı ve basit görsel araçları.",
    navigation: "Alt bilgi gezinmesi",
    aboutUs: "Hakkımızda",
    contactUs: "Bize Ulaşın",
    privacyPolicy: "Gizlilik Politikası",
    termsOfService: "Hizmet Şartları",
    cookiePolicy: "Çerez Politikası",
    resetConsent: "Onay Tercihlerini Sıfırla",
  },
  consent: {
    title: "Çerezleri kullanıyoruz",
    description:
      "ToolsGift, web sitesinin çalışması için gerekli çerezleri kullanır. İsteğe bağlı çerezler analiz ve reklam amacıyla kullanılabilir. İsteğe bağlı çerezlere izin verip vermeyeceğinizi siz seçersiniz.",
    policyLink: "Çerez politikamızı okuyun",
    rejectOptional: "İsteğe Bağlıları Reddet",
    acceptAll: "Tümünü Kabul Et",
    managePreferences: "Çerez Tercihlerini Yönet",
    preferencesTitle: "Çerez Tercihleri",
    preferencesDescription:
      "İzin vermek istediğiniz isteğe bağlı çerezleri seçin. Gerekli çerezler, web sitesinin temel işlevlerini destekledikleri için her zaman etkindir.",
    necessaryTitle: "Gerekli Çerezler",
    necessaryDescription: "Web sitesinin temel işlevleri için gereklidir.",
    alwaysOn: "Her Zaman Açık",
    analyticsTitle: "Analiz Çerezleri",
    analyticsDescription:
      "Web sitesinin kullanımını ve performansını anlamamıza yardımcı olur.",
    advertisingTitle: "Reklam Çerezleri",
    advertisingDescription:
      "Kişiselleştirilmiş veya ölçülebilir reklamları desteklemek için kullanılabilir.",
    resetChoices: "Onay tercihlerini sıfırla",
    cancel: "İptal",
    savePreferences: "Tercihleri Kaydet",
  },
  related: {
    title: "İlgili Araçlar",
    description: "Dosyalarınızla çalışmak için daha fazla kullanışlı araç keşfedin.",
  },
  notFound: {
    title: "Sayfa bulunamadı.",
    description:
      "Aradığınız sayfa mevcut değil, taşınmış olabilir veya bağlantı yanlış olabilir.",
    backHome: "Ana Sayfaya Dön",
    exploreTools: "Araçları Keşfet",
  },
};

const uiUk = {
  badges: {
    image: "Зображення",
    pdf: "PDF",
    other: "Інше",
    generator: "Генератор",
    utility: "Утиліта",
    calculator: "Калькулятор",
    text: "Текст",
  },
  footerLinks: {
    tagline: "Швидкі та прості інструменти для зображень.",
    navigation: "Навігація в нижньому колонтитулі",
    aboutUs: "Про нас",
    contactUs: "Зв'яжіться з нами",
    privacyPolicy: "Політика конфіденційності",
    termsOfService: "Умови використання",
    cookiePolicy: "Політика використання файлів cookie",
    resetConsent: "Скинути налаштування згоди",
  },
  consent: {
    title: "Ми використовуємо файли cookie",
    description:
      "ToolsGift використовує необхідні файли cookie для роботи сайту. Додаткові файли cookie можуть використовуватися для аналітики та реклами. Ви можете вибрати, чи дозволяти додаткові файли cookie.",
    policyLink: "Прочитати нашу політику використання файлів cookie",
    rejectOptional: "Відхилити додаткові",
    acceptAll: "Прийняти всі",
    managePreferences: "Керувати налаштуваннями cookie",
    preferencesTitle: "Налаштування cookie",
    preferencesDescription:
      "Виберіть, які додаткові файли cookie дозволити. Необхідні файли cookie завжди ввімкнені, оскільки вони забезпечують основну функціональність сайту.",
    necessaryTitle: "Необхідні файли cookie",
    necessaryDescription: "Потрібні для основної функціональності сайту.",
    alwaysOn: "Завжди ввімкнені",
    analyticsTitle: "Аналітичні файли cookie",
    analyticsDescription:
      "Допомагають нам розуміти використання та продуктивність сайту.",
    advertisingTitle: "Рекламні файли cookie",
    advertisingDescription:
      "Можуть використовуватися для персоналізованої або вимірюваної реклами.",
    resetChoices: "Скинути налаштування згоди",
    cancel: "Скасувати",
    savePreferences: "Зберегти налаштування",
  },
  related: {
    title: "Пов'язані інструменти",
    description: "Перегляньте більше корисних інструментів для роботи з файлами.",
  },
  notFound: {
    title: "Сторінку не знайдено.",
    description:
      "Сторінка, яку ви шукаєте, не існує, її могло бути переміщено, або посилання може бути неправильним.",
    backHome: "Повернутися на головну",
    exploreTools: "Переглянути інструменти",
  },
};

const uiVi = {
  badges: {
    image: "Hình ảnh",
    pdf: "PDF",
    other: "Khác",
    generator: "Trình tạo",
    utility: "Tiện ích",
    calculator: "Máy tính",
    text: "Văn bản",
  },
  footerLinks: {
    tagline: "Công cụ hình ảnh nhanh chóng và đơn giản.",
    navigation: "Điều hướng chân trang",
    aboutUs: "Giới thiệu",
    contactUs: "Liên hệ",
    privacyPolicy: "Chính sách bảo mật",
    termsOfService: "Điều khoản dịch vụ",
    cookiePolicy: "Chính sách cookie",
    resetConsent: "Đặt lại lựa chọn đồng ý",
  },
  consent: {
    title: "Chúng tôi sử dụng cookie",
    description:
      "ToolsGift sử dụng cookie cần thiết để website hoạt động. Cookie tùy chọn có thể được dùng cho phân tích và quảng cáo. Bạn có thể chọn có cho phép cookie tùy chọn hay không.",
    policyLink: "Đọc chính sách cookie của chúng tôi",
    rejectOptional: "Từ chối tùy chọn",
    acceptAll: "Chấp nhận tất cả",
    managePreferences: "Quản lý tùy chọn cookie",
    preferencesTitle: "Tùy chọn cookie",
    preferencesDescription:
      "Chọn cookie tùy chọn bạn muốn cho phép. Cookie cần thiết luôn được bật vì chúng hỗ trợ các chức năng cơ bản của website.",
    necessaryTitle: "Cookie cần thiết",
    necessaryDescription: "Cần thiết cho các chức năng cơ bản của website.",
    alwaysOn: "Luôn bật",
    analyticsTitle: "Cookie phân tích",
    analyticsDescription:
      "Giúp chúng tôi hiểu cách sử dụng và hiệu suất của website.",
    advertisingTitle: "Cookie quảng cáo",
    advertisingDescription:
      "Có thể được dùng để hỗ trợ quảng cáo được cá nhân hóa hoặc đo lường.",
    resetChoices: "Đặt lại lựa chọn đồng ý",
    cancel: "Hủy",
    savePreferences: "Lưu tùy chọn",
  },
  related: {
    title: "Công cụ liên quan",
    description: "Khám phá thêm các công cụ hữu ích để làm việc với tệp của bạn.",
  },
  notFound: {
    title: "Không tìm thấy trang.",
    description:
      "Trang bạn đang tìm không tồn tại, có thể đã bị di chuyển hoặc liên kết không chính xác.",
    backHome: "Quay về trang chủ",
    exploreTools: "Khám phá công cụ",
  },
};

const uiSw = {
  badges: {
    image: "Picha",
    pdf: "PDF",
    other: "Nyingine",
    generator: "Kijenereta",
    utility: "Huduma",
    calculator: "Kikokotoo",
    text: "Maandishi",
  },
  footerLinks: {
    tagline: "Zana za picha za haraka na rahisi.",
    navigation: "Urambazaji wa sehemu ya chini",
    aboutUs: "Kuhusu Sisi",
    contactUs: "Wasiliana Nasi",
    privacyPolicy: "Sera ya Faragha",
    termsOfService: "Sheria na Masharti",
    cookiePolicy: "Sera ya Vidakuzi",
    resetConsent: "Weka Upya Chaguo za Idhini",
  },
  consent: {
    title: "Tunatumia vidakuzi",
    description:
      "ToolsGift hutumia vidakuzi muhimu ili tovuti iendelee kufanya kazi. Vidakuzi vya hiari vinaweza kutumika kwa uchanganuzi na utangazaji. Unaweza kuchagua kuruhusu vidakuzi vya hiari au la.",
    policyLink: "Soma Sera yetu ya Vidakuzi",
    rejectOptional: "Kataa Vya Hiari",
    acceptAll: "Kubali Vyote",
    managePreferences: "Dhibiti Mapendeleo ya Vidakuzi",
    preferencesTitle: "Mapendeleo ya Vidakuzi",
    preferencesDescription:
      "Chagua vidakuzi vya hiari unavyotaka kuruhusu. Vidakuzi muhimu huwa vimewashwa kila wakati kwa sababu vinasaidia utendakazi wa msingi wa tovuti.",
    necessaryTitle: "Vidakuzi Muhimu",
    necessaryDescription: "Vinahitajika kwa utendakazi wa msingi wa tovuti.",
    alwaysOn: "Washa Daima",
    analyticsTitle: "Vidakuzi vya Uchanganuzi",
    analyticsDescription:
      "Vinatusaidia kuelewa matumizi na utendaji wa tovuti.",
    advertisingTitle: "Vidakuzi vya Utangazaji",
    advertisingDescription:
      "Vinaweza kutumika kusaidia utangazaji unaobinafsishwa au unaopimwa.",
    resetChoices: "Weka upya chaguo za idhini",
    cancel: "Ghairi",
    savePreferences: "Hifadhi Mapendeleo",
  },
  related: {
    title: "Zana Zinazohusiana",
    description: "Gundua zana nyingine muhimu za kufanya kazi na faili zako.",
  },
  notFound: {
    title: "Ukurasa haujapatikana.",
    description:
      "Ukurasa unaoutafuta haupo, huenda ulihamishwa, au kiungo kinaweza kuwa si sahihi.",
    backHome: "Rudi Nyumbani",
    exploreTools: "Vinjari Zana",
  },
};

const uiEn = uiBase;

const uiByLocale: Partial<
  Record<keyof typeof rawTranslations, typeof uiBase>
> = {
  en: uiEn,
  hi: uiHi,
  es: uiEs,
  fr: uiFr,
  de: uiDe,
  it: uiIt,
  pt: uiPt,
  ja: uiJa,
  ru: uiRu,
  ko: uiKo,
  "zh-cn": uiZhCn,
  "zh-tw": uiZhTw,
  ar: uiAr,
  bg: uiBg,
  ca: uiCa,
  nl: uiNl,
  el: uiEl,
  id: uiId,
  ms: uiMs,
  pl: uiPl,
  sv: uiSv,
  th: uiTh,
  tr: uiTr,
  uk: uiUk,
  vi: uiVi,
  sw: uiSw,
};

export const translations = Object.fromEntries(
  (Object.keys(rawTranslations) as (keyof typeof rawTranslations)[]).map(
    (locale) => [
      locale,
      { ...rawTranslations[locale], ...(uiByLocale[locale] ?? uiBase) },
    ]
  )
) as unknown as {
  [K in keyof typeof rawTranslations]: (typeof rawTranslations)[K] &
    typeof uiBase;
};

export type Locale = keyof typeof translations;

export type Translations = (typeof translations)[Locale];

export const supportedLocales = [
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "ja",
  "ru",
  "ko",
  "zh-cn",
  "zh-tw",
  "ar",
  "bg",
  "ca",
  "nl",
  "el",
  "hi",
  "id",
  "ms",
  "pl",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "sw",
] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const languageOptions: {
  code: SupportedLocale;
  name: string;
}[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "ja", name: "日本語" },
  { code: "ru", name: "Русский" },
  { code: "ko", name: "한국어" },
  { code: "zh-cn", name: "中文 (简体)" },
  { code: "zh-tw", name: "中文 (繁體)" },
  { code: "ar", name: "العربية" },
  { code: "bg", name: "Български" },
  { code: "ca", name: "Català" },
  { code: "nl", name: "Nederlands" },
  { code: "el", name: "Ελληνικά" },
  { code: "hi", name: "हिन्दी" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "ms", name: "Bahasa Melayu" },
  { code: "pl", name: "Polski" },
  { code: "sv", name: "Svenska" },
  { code: "th", name: "ภาษาไทย" },
  { code: "tr", name: "Türkçe" },
  { code: "uk", name: "Українська" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "sw", name: "Kiswahili" },
];

export type ToolText = {
  title: string;
  description: string;
};

const toolTextEn: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Shipping Label & Invoice PDF",
    description:
      "Fit shipping labels and invoices from any PDF onto exact 4×6, 100×150 mm or custom print pages — no stretching, no cut content.",
  },
  compressor: {
    title: "Image Compressor",
    description:
      "Reduce image file size while maintaining excellent quality.",
  },
  "favicon-generator": {
    title: "Favicon Generator",
    description:
      "Create favicon images in multiple sizes from PNG, JPG, WebP or SVG files.",
  },
  "qr-code-generator": {
    title: "QR Code Generator",
    description:
      "Create QR codes from URLs, text and other information instantly.",
  },
  "unit-converter": {
    title: "Unit Converter",
    description:
      "Convert length, weight and temperature units instantly with an easy online converter.",
  },
  "percentage-calculator": {
    title: "Percentage Calculator",
    description: "Calculate a percentage of any number quickly and easily.",
  },
  "case-converter": {
    title: "Case Converter",
    description:
      "Convert text to uppercase, lowercase, title case or sentence case instantly.",
  },
  "character-counter": {
    title: "Character Counter",
    description:
      "Count characters, spaces, words, sentences and paragraphs instantly.",
  },
  "word-counter": {
    title: "Word Counter",
    description:
      "Count words, characters, sentences, paragraphs and lines instantly.",
  },
  "heic-to-jpg": {
    title: "HEIC to JPG",
    description: "Convert HEIC and HEIF images to JPG online for free.",
  },
  "compress-image-to-kb": {
    title: "Compress Image to KB",
    description:
      "Compress images to 20KB, 50KB, 100KB, 200KB or a custom target size.",
  },
  "image-to-text": {
    title: "Image to Text",
    description:
      "Extract text from JPG, PNG, WebP and other images with browser-based OCR.",
  },
  converter: {
    title: "Image Converter",
    description:
      "Convert JPG, PNG, WebP and other popular image formats.",
  },
  resizer: {
    title: "Image Resizer",
    description: "Resize images to your exact dimensions in seconds.",
  },
  cropper: {
    title: "Image Cropper",
    description: "Crop your images quickly with precise dimensions.",
  },
  "image-to-pdf": {
    title: "Image to PDF",
    description: "Turn one or multiple images into a PDF document.",
  },
  "webp-converter": {
    title: "WebP Converter",
    description: "Convert images to the fast and efficient WebP format.",
  },
  rotator: {
    title: "Image Rotator",
    description: "Rotate and straighten your images with ease.",
  },
  enhancer: {
    title: "Image Enhancer",
    description: "Improve image clarity and visual quality.",
  },
  "background-remover": {
    title: "Background Remover",
    description:
      "Remove image backgrounds and replace them with professional colors.",
  },
  "image-metadata": {
    title: "Image Metadata Tool",
    description:
      "View image metadata, inspect EXIF information, remove metadata and download a clean image.",
  },
  "passport-photo": {
    title: "Passport Size Photo",
    description:
      "Create standard passport-size photos and printable photo sheets.",
  },
  "batch-converter": {
    title: "Batch Converter",
    description: "Process multiple images together in one workflow.",
  },
  "image-to-word": {
    title: "Image to Word",
    description: "Convert one or multiple images into a Word document.",
  },
  "word-to-image": {
    title: "Word to Image",
    description: "Convert your Word document into an image quickly.",
  },
  "pdf-merger": {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document.",
  },
  "pdf-splitter": {
    title: "Split PDF",
    description: "Split a PDF into separate documents quickly and easily.",
  },
  "pdf-compressor": {
    title: "Compress PDF",
    description:
      "Reduce PDF file size while keeping your documents easy to use.",
  },
  "pdf-to-word": {
    title: "PDF to Word",
    description: "Convert PDF files into editable Word documents.",
  },
  "pdf-to-powerpoint": {
    title: "PDF to PowerPoint",
    description: "Convert PDF files into PowerPoint presentations.",
  },
  "pdf-to-excel": {
    title: "PDF to Excel",
    description: "Convert PDF files into Excel spreadsheets.",
  },
  "word-to-pdf": {
    title: "Word to PDF",
    description: "Convert Word documents into PDF files.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint to PDF",
    description: "Convert PowerPoint presentations into PDF files.",
  },
  "excel-to-pdf": {
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets into PDF files.",
  },
  "pdf-editor": {
    title: "PDF Editor",
    description: "Add text to your PDF pages and edit your documents.",
  },
  "pdf-to-jpg": {
    title: "PDF to JPG",
    description: "Convert PDF pages into JPG images.",
  },
  "pdf-signer": {
    title: "Sign PDF",
    description: "Add your signature to PDF documents.",
  },
  "pdf-watermark": {
    title: "PDF Watermark",
    description: "Add a custom watermark to every page of your PDF.",
  },
  "pdf-rotator": {
    title: "Rotate PDF",
    description: "Rotate PDF pages to the correct orientation.",
  },
  "html-to-pdf": {
    title: "HTML to PDF",
    description: "Convert HTML content into a PDF document.",
  },
  "pdf-unlocker": {
    title: "Unlock PDF",
    description:
      "Remove PDF restrictions from documents you are authorized to edit.",
  },
  "pdf-protector": {
    title: "Protect PDF",
    description: "Add protection settings to your PDF documents.",
  },
  "pdf-organizer": {
    title: "Organize PDF",
    description: "Reorder, organize, and combine PDF files.",
  },
  "pdf-to-pdfa": {
    title: "PDF to PDF/A",
    description: "Prepare PDF documents for long-term archiving.",
  },
  "pdf-repair": {
    title: "Repair PDF",
    description: "Try to repair PDF files with minor structural issues.",
  },
  "pdf-page-numbers": {
    title: "Add PDF Page Numbers",
    description: "Add page numbers to your PDF documents.",
  },
  "scan-to-pdf": {
    title: "Scan to PDF",
    description: "Convert scanned images into a PDF document.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Extract searchable text from scanned PDF documents.",
  },
  "pdf-comparer": {
    title: "Compare PDF",
    description:
      "Compare two PDF documents and identify basic differences.",
  },
  "pdf-redactor": {
    title: "Redact PDF",
    description: "Hide sensitive information in PDF documents.",
  },
  "pdf-cropper": {
    title: "Crop PDF",
    description: "Crop PDF pages and remove unwanted margins.",
  },
  "pdf-forms": {
    title: "PDF Forms",
    description:
      "Fill PDF form fields and add information to documents.",
  },
  "pdf-summarizer": {
    title: "PDF Summarizer",
    description:
      "Summarize PDF documents and understand key content.",
  },
  "pdf-translator": {
    title: "PDF Translator",
    description: "Translate PDF documents into your preferred language.",
  },
  "pdf-to-markdown": {
    title: "PDF to Markdown",
    description: "Convert PDF documents into Markdown files.",
  },
  "social-qr-card": {
    title: "Social Media QR Card",
    description:
      "Create one QR code for WhatsApp, Instagram, Facebook, X, YouTube and other social links.",
  },
  "video-to-link": {
    title: "Video → Link",
    description:
      "Upload a video and create a shareable link with an expiry time.",
  },
  "bulk-sms": {
    title: "Bulk SMS",
    description:
      "Personalize one SMS message for every contact, validate phone numbers and copy or export the list.",
  },
  "bulk-email": {
    title: "Bulk Email",
    description:
      "Personalize one email for every contact, validate email addresses and copy or export the list.",
  },
  "audio-to-text": {
    title: "Audio to Text",
    description:
      "Turn audio recordings into editable text with private, in-browser transcription. Your audio file is never uploaded.",
  },
};

const toolTextHi: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "शिपिंग लेबल और इनवॉएस पीएडी",
    description:
      "किसी भी पीएडी से शिपिंग लेबल और इनवॉएस को सही निर्दिष्ट 4×6, 100×150 मिमी या कस्टम प्रिंट पेज पर फिट करें — बिना स्ट्रेच, बिना कटा।",
  },
  compressor: {
    title: "इमेज कम्प्रेसर",
    description: "बेहतरीन गुणवत्ता बनाए रखते हुए इमेज फ़ाइल का आकार कम करें।",
  },
  "favicon-generator": {
    title: "फ़ेविकॉन जनरेटर",
    description:
      "PNG, JPG, WebP या SVG फ़ाइलों से कई आकारों में फ़ेविकॉन इमेज बनाएँ।",
  },
  "qr-code-generator": {
    title: "QR कोड जनरेटर",
    description: "URL, टेक्स्ट और अन्य जानकारी से तुरंत QR कोड बनाएँ।",
  },
  "unit-converter": {
    title: "यूनिट कन्वर्टर",
    description:
      "आसान ऑनलाइन कन्वर्टर से लंबाई, वज़न और तापमान की इकाइयाँ तुरंत बदलें।",
  },
  "percentage-calculator": {
    title: "प्रतिशत कैलकुलेटर",
    description: "किसी भी संख्या का प्रतिशत जल्दी और आसानी से निकालें।",
  },
  "case-converter": {
    title: "केस कन्वर्टर",
    description:
      "टेक्स्ट को तुरंत अपरकेस, लोअरकेस, टाइटल केस या सेंटेंस केस में बदलें।",
  },
  "character-counter": {
    title: "कैरेक्टर काउंटर",
    description:
      "अक्षर, स्पेस, शब्द, वाक्य और पैराग्राफ तुरंत गिनें।",
  },
  "word-counter": {
    title: "वर्ड काउंटर",
    description:
      "शब्द, अक्षर, वाक्य, पैराग्राफ और पंक्तियाँ तुरंत गिनें।",
  },
  "heic-to-jpg": {
    title: "HEIC से JPG",
    description: "HEIC और HEIF इमेज को मुफ़्त में ऑनलाइन JPG में बदलें।",
  },
  "compress-image-to-kb": {
    title: "इमेज को KB में कम्प्रेस करें",
    description:
      "इमेज को 20KB, 50KB, 100KB, 200KB या कस्टम आकार तक कम्प्रेस करें।",
  },
  "image-to-text": {
    title: "इमेज से टेक्स्ट",
    description:
      "ब्राउज़र-आधारित OCR से JPG, PNG, WebP और अन्य इमेज से टेक्स्ट निकालें।",
  },
  converter: {
    title: "इमेज कन्वर्टर",
    description: "JPG, PNG, WebP और अन्य लोकप्रिय इमेज फ़ॉर्मेट बदलें।",
  },
  resizer: {
    title: "इमेज रिसाइज़र",
    description: "इमेज को कुछ ही सेकंड में अपने सटीक आकार में बदलें।",
  },
  cropper: {
    title: "इमेज क्रॉपर",
    description: "सटीक आयामों के साथ अपनी इमेज जल्दी क्रॉप करें।",
  },
  "image-to-pdf": {
    title: "इमेज से PDF",
    description: "एक या कई इमेज को PDF दस्तावेज़ में बदलें।",
  },
  "webp-converter": {
    title: "WebP कन्वर्टर",
    description: "इमेज को तेज़ और कुशल WebP फ़ॉर्मेट में बदलें।",
  },
  rotator: {
    title: "इमेज रोटेटर",
    description: "अपनी इमेज को आसानी से घुमाएँ और सीधा करें।",
  },
  enhancer: {
    title: "इमेज एन्हांसर",
    description: "इमेज की स्पष्टता और दृश्य गुणवत्ता बेहतर करें।",
  },
  "background-remover": {
    title: "बैकग्राउंड रिमूवर",
    description:
      "इमेज का बैकग्राउंड हटाएँ और उसे पेशेवर रंगों से बदलें।",
  },
  "image-metadata": {
    title: "इमेज मेटाडेटा टूल",
    description:
      "इमेज मेटाडेटा देखें, EXIF जानकारी जाँचें, मेटाडेटा हटाएँ और साफ़ इमेज डाउनलोड करें।",
  },
  "passport-photo": {
    title: "पासपोर्ट साइज़ फ़ोटो",
    description:
      "मानक पासपोर्ट-आकार की फ़ोटो और प्रिंट करने योग्य फ़ोटो शीट बनाएँ।",
  },
  "batch-converter": {
    title: "बैच कन्वर्टर",
    description: "एक ही वर्कफ़्लो में कई इमेज एक साथ प्रोसेस करें।",
  },
  "image-to-word": {
    title: "इमेज से Word",
    description: "एक या कई इमेज को Word दस्तावेज़ में बदलें।",
  },
  "word-to-image": {
    title: "Word से इमेज",
    description: "अपने Word दस्तावेज़ को जल्दी से इमेज में बदलें।",
  },
  "pdf-merger": {
    title: "PDF मर्ज करें",
    description: "कई PDF फ़ाइलों को एक दस्तावेज़ में जोड़ें।",
  },
  "pdf-splitter": {
    title: "PDF स्प्लिट करें",
    description: "PDF को जल्दी और आसानी से अलग दस्तावेज़ों में बाँटें।",
  },
  "pdf-compressor": {
    title: "PDF कम्प्रेस करें",
    description:
      "दस्तावेज़ों को उपयोग में आसान रखते हुए PDF फ़ाइल का आकार कम करें।",
  },
  "pdf-to-word": {
    title: "PDF से Word",
    description: "PDF फ़ाइलों को संपादन योग्य Word दस्तावेज़ों में बदलें।",
  },
  "pdf-to-powerpoint": {
    title: "PDF से PowerPoint",
    description: "PDF फ़ाइलों को PowerPoint प्रस्तुतियों में बदलें।",
  },
  "pdf-to-excel": {
    title: "PDF से Excel",
    description: "PDF फ़ाइलों को Excel स्प्रेडशीट में बदलें।",
  },
  "word-to-pdf": {
    title: "Word से PDF",
    description: "Word दस्तावेज़ों को PDF फ़ाइलों में बदलें।",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint से PDF",
    description: "PowerPoint प्रस्तुतियों को PDF फ़ाइलों में बदलें।",
  },
  "excel-to-pdf": {
    title: "Excel से PDF",
    description: "Excel स्प्रेडशीट को PDF फ़ाइलों में बदलें।",
  },
  "pdf-editor": {
    title: "PDF एडिटर",
    description: "अपने PDF पेजों में टेक्स्ट जोड़ें और दस्तावेज़ संपादित करें।",
  },
  "pdf-to-jpg": {
    title: "PDF से JPG",
    description: "PDF पेजों को JPG इमेज में बदलें।",
  },
  "pdf-signer": {
    title: "PDF पर हस्ताक्षर करें",
    description: "PDF दस्तावेज़ों में अपना हस्ताक्षर जोड़ें।",
  },
  "pdf-watermark": {
    title: "PDF वॉटरमार्क",
    description: "अपने PDF के हर पेज पर कस्टम वॉटरमार्क जोड़ें।",
  },
  "pdf-rotator": {
    title: "PDF घुमाएँ",
    description: "PDF पेजों को सही दिशा में घुमाएँ।",
  },
  "html-to-pdf": {
    title: "HTML से PDF",
    description: "HTML सामग्री को PDF दस्तावेज़ में बदलें।",
  },
  "pdf-unlocker": {
    title: "PDF अनलॉक करें",
    description:
      "जिन दस्तावेज़ों को संपादित करने के लिए आप अधिकृत हैं उनसे PDF प्रतिबंध हटाएँ।",
  },
  "pdf-protector": {
    title: "PDF सुरक्षित करें",
    description: "अपने PDF दस्तावेज़ों में सुरक्षा सेटिंग्स जोड़ें।",
  },
  "pdf-organizer": {
    title: "PDF व्यवस्थित करें",
    description: "PDF फ़ाइलों को पुनः क्रमित, व्यवस्थित और संयोजित करें।",
  },
  "pdf-to-pdfa": {
    title: "PDF से PDF/A",
    description: "PDF दस्तावेज़ों को दीर्घकालिक संग्रहण के लिए तैयार करें।",
  },
  "pdf-repair": {
    title: "PDF रिपेयर करें",
    description:
      "छोटी संरचनात्मक समस्याओं वाली PDF फ़ाइलों को ठीक करने का प्रयास करें।",
  },
  "pdf-page-numbers": {
    title: "PDF पेज नंबर जोड़ें",
    description: "अपने PDF दस्तावेज़ों में पेज नंबर जोड़ें।",
  },
  "scan-to-pdf": {
    title: "स्कैन से PDF",
    description: "स्कैन की गई इमेज को PDF दस्तावेज़ में बदलें।",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "स्कैन किए गए PDF दस्तावेज़ों से खोजने योग्य टेक्स्ट निकालें।",
  },
  "pdf-comparer": {
    title: "PDF की तुलना करें",
    description: "दो PDF दस्तावेज़ों की तुलना करें और बुनियादी अंतर पहचानें।",
  },
  "pdf-redactor": {
    title: "PDF रिडैक्ट करें",
    description: "PDF दस्तावेज़ों में संवेदनशील जानकारी छिपाएँ।",
  },
  "pdf-cropper": {
    title: "PDF क्रॉप करें",
    description: "PDF पेजों को क्रॉप करें और अनचाहे मार्जिन हटाएँ।",
  },
  "pdf-forms": {
    title: "PDF फ़ॉर्म",
    description: "PDF फ़ॉर्म फ़ील्ड भरें और दस्तावेज़ों में जानकारी जोड़ें।",
  },
  "pdf-summarizer": {
    title: "PDF सारांशक",
    description: "PDF दस्तावेज़ों का सारांश बनाएँ और मुख्य सामग्री समझें।",
  },
  "pdf-translator": {
    title: "PDF अनुवादक",
    description: "PDF दस्तावेज़ों को अपनी पसंदीदा भाषा में अनुवाद करें।",
  },
  "pdf-to-markdown": {
    title: "PDF से Markdown",
    description: "PDF दस्तावेज़ों को Markdown फ़ाइलों में बदलें।",
  },
  "social-qr-card": {
    title: "सोशल मीडिया QR कार्ड",
    description:
      "WhatsApp, Instagram, Facebook, X, YouTube और अन्य सोशल लिंक के लिए एक QR कोड बनाएँ।",
  },
  "video-to-link": {
    title: "वीडियो → लिंक",
    description:
      "एक वीडियो अपलोड करें और समाप्ति समय के साथ साझा करने योग्य लिंक बनाएँ।",
  },
  "bulk-sms": {
    title: "बल्क SMS",
    description:
      "हर संपर्क के लिए एक SMS संदेश को व्यक्तिगत बनाएं, फ़ोन नंबर जांचें और सूची कॉपी या एक्सपोर्ट करें।",
  },
  "bulk-email": {
    title: "बल्क ईमेल",
    description:
      "हर संपर्क के लिए एक ईमेल व्यक्तिगत बनाएं, ईमेल पते जांचें और सूची कॉपी या एक्सपोर्ट करें।",
  },
  "audio-to-text": {
    title: "ऑडियो से टेक्स्ट",
    description:
      "ब्राउज़र में निजी तरीके से ऑडियो रिकॉर्डिंग को एडिट करने योग्य टेक्स्ट में बदलें। आपकी ऑडियो फ़ाइल कहीं अपलोड नहीं होती।",
  },
};

const toolTextEs: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Etiqueta de envío y factura PDF",
    description:
      "Ajusta etiquetas de envío y facturas de cualquier PDF a páginas de impresión exactas de 4×6, 100×150 mm o personalizadas, sin estirar ni cortar contenido.",
  },
  compressor: {
    title: "Compresor de imágenes",
    description:
      "Reduce el tamaño del archivo de imagen manteniendo una excelente calidad.",
  },
  "favicon-generator": {
    title: "Generador de favicons",
    description:
      "Crea imágenes favicon en varios tamaños desde archivos PNG, JPG, WebP o SVG.",
  },
  "qr-code-generator": {
    title: "Generador de códigos QR",
    description:
      "Crea códigos QR a partir de URLs, texto y otra información al instante.",
  },
  "unit-converter": {
    title: "Conversor de unidades",
    description:
      "Convierte unidades de longitud, peso y temperatura al instante con un conversor online sencillo.",
  },
  "percentage-calculator": {
    title: "Calculadora de porcentajes",
    description: "Calcula el porcentaje de cualquier número de forma rápida y sencilla.",
  },
  "case-converter": {
    title: "Conversor de mayúsculas y minúsculas",
    description:
      "Convierte texto a mayúsculas, minúsculas, tipo título o tipo oración al instante.",
  },
  "character-counter": {
    title: "Contador de caracteres",
    description:
      "Cuenta caracteres, espacios, palabras, frases y párrafos al instante.",
  },
  "word-counter": {
    title: "Contador de palabras",
    description:
      "Cuenta palabras, caracteres, frases, párrafos y líneas al instante.",
  },
  "heic-to-jpg": {
    title: "HEIC a JPG",
    description: "Convierte imágenes HEIC y HEIF a JPG online gratis.",
  },
  "compress-image-to-kb": {
    title: "Comprimir imagen a KB",
    description:
      "Comprime imágenes a 20KB, 50KB, 100KB, 200KB o un tamaño personalizado.",
  },
  "image-to-text": {
    title: "Imagen a texto",
    description:
      "Extrae texto de JPG, PNG, WebP y otras imágenes con OCR en el navegador.",
  },
  converter: {
    title: "Conversor de imágenes",
    description:
      "Convierte JPG, PNG, WebP y otros formatos de imagen populares.",
  },
  resizer: {
    title: "Redimensionador de imágenes",
    description: "Cambia el tamaño de tus imágenes a las dimensiones exactas en segundos.",
  },
  cropper: {
    title: "Recortador de imágenes",
    description: "Recorta tus imágenes rápidamente con dimensiones precisas.",
  },
  "image-to-pdf": {
    title: "Imagen a PDF",
    description: "Convierte una o varias imágenes en un documento PDF.",
  },
  "webp-converter": {
    title: "Conversor de WebP",
    description: "Convierte imágenes al formato WebP, rápido y eficiente.",
  },
  rotator: {
    title: "Rotador de imágenes",
    description: "Rota y endereza tus imágenes con facilidad.",
  },
  enhancer: {
    title: "Mejorador de imágenes",
    description: "Mejora la claridad y la calidad visual de la imagen.",
  },
  "background-remover": {
    title: "Eliminador de fondos",
    description:
      "Elimina el fondo de las imágenes y sustitúyelo por colores profesionales.",
  },
  "image-metadata": {
    title: "Herramienta de metadatos de imagen",
    description:
      "Consulta los metadatos, inspecciona la información EXIF, elimina los metadatos y descarga una imagen limpia.",
  },
  "passport-photo": {
    title: "Foto tamaño pasaporte",
    description:
      "Crea fotos de tamaño pasaporte estándar y hojas de fotos imprimibles.",
  },
  "batch-converter": {
    title: "Conversor por lotes",
    description: "Procesa varias imágenes juntas en un solo flujo de trabajo.",
  },
  "image-to-word": {
    title: "Imagen a Word",
    description: "Convierte una o varias imágenes en un documento de Word.",
  },
  "word-to-image": {
    title: "Word a imagen",
    description: "Convierte tu documento de Word en una imagen rápidamente.",
  },
  "pdf-merger": {
    title: "Unir PDF",
    description: "Combina varios archivos PDF en un solo documento.",
  },
  "pdf-splitter": {
    title: "Dividir PDF",
    description: "Divide un PDF en documentos separados de forma rápida y sencilla.",
  },
  "pdf-compressor": {
    title: "Comprimir PDF",
    description:
      "Reduce el tamaño del archivo PDF manteniendo los documentos fáciles de usar.",
  },
  "pdf-to-word": {
    title: "PDF a Word",
    description: "Convierte archivos PDF en documentos de Word editables.",
  },
  "pdf-to-powerpoint": {
    title: "PDF a PowerPoint",
    description: "Convierte archivos PDF en presentaciones de PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF a Excel",
    description: "Convierte archivos PDF en hojas de cálculo de Excel.",
  },
  "word-to-pdf": {
    title: "Word a PDF",
    description: "Convierte documentos de Word en archivos PDF.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint a PDF",
    description: "Convierte presentaciones de PowerPoint en archivos PDF.",
  },
  "excel-to-pdf": {
    title: "Excel a PDF",
    description: "Convierte hojas de cálculo de Excel en archivos PDF.",
  },
  "pdf-editor": {
    title: "Editor de PDF",
    description: "Añade texto a las páginas de tu PDF y edita tus documentos.",
  },
  "pdf-to-jpg": {
    title: "PDF a JPG",
    description: "Convierte las páginas de un PDF en imágenes JPG.",
  },
  "pdf-signer": {
    title: "Firmar PDF",
    description: "Añade tu firma a documentos PDF.",
  },
  "pdf-watermark": {
    title: "Marca de agua PDF",
    description: "Añade una marca de agua personalizada a cada página de tu PDF.",
  },
  "pdf-rotator": {
    title: "Rotar PDF",
    description: "Rota las páginas del PDF a la orientación correcta.",
  },
  "html-to-pdf": {
    title: "HTML a PDF",
    description: "Convierte contenido HTML en un documento PDF.",
  },
  "pdf-unlocker": {
    title: "Desbloquear PDF",
    description:
      "Elimina las restricciones de PDF de documentos que estás autorizado a editar.",
  },
  "pdf-protector": {
    title: "Proteger PDF",
    description: "Añade ajustes de protección a tus documentos PDF.",
  },
  "pdf-organizer": {
    title: "Organizar PDF",
    description: "Reordena, organiza y combina archivos PDF.",
  },
  "pdf-to-pdfa": {
    title: "PDF a PDF/A",
    description: "Prepara documentos PDF para el archivo a largo plazo.",
  },
  "pdf-repair": {
    title: "Reparar PDF",
    description: "Intenta reparar archivos PDF con pequeños problemas estructurales.",
  },
  "pdf-page-numbers": {
    title: "Añadir números de página al PDF",
    description: "Añade números de página a tus documentos PDF.",
  },
  "scan-to-pdf": {
    title: "Escanear a PDF",
    description: "Convierte imágenes escaneadas en un documento PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Extrae texto buscable de documentos PDF escaneados.",
  },
  "pdf-comparer": {
    title: "Comparar PDF",
    description: "Compara dos documentos PDF e identifica las diferencias básicas.",
  },
  "pdf-redactor": {
    title: "Censurar PDF",
    description: "Oculta información sensible en documentos PDF.",
  },
  "pdf-cropper": {
    title: "Recortar PDF",
    description: "Recorta las páginas del PDF y elimina los márgenes no deseados.",
  },
  "pdf-forms": {
    title: "Formularios PDF",
    description:
      "Rellena los campos de formularios PDF y añade información a los documentos.",
  },
  "pdf-summarizer": {
    title: "Resumidor de PDF",
    description: "Resume documentos PDF y comprende el contenido clave.",
  },
  "pdf-translator": {
    title: "Traductor de PDF",
    description: "Traduce documentos PDF a tu idioma preferido.",
  },
  "pdf-to-markdown": {
    title: "PDF a Markdown",
    description: "Convierte documentos PDF en archivos Markdown.",
  },
  "social-qr-card": {
    title: "Tarjeta QR para redes sociales",
    description:
      "Crea un solo código QR para WhatsApp, Instagram, Facebook, X, YouTube y otros enlaces sociales.",
  },
  "video-to-link": {
    title: "Vídeo → Enlace",
    description:
      "Sube un vídeo y crea un enlace compartible con tiempo de caducidad.",
  },
  "bulk-sms": {
    title: "SMS masivo",
    description:
      "Personaliza un mensaje SMS para cada contacto, valida los números de teléfono y copia o exporta la lista.",
  },
  "bulk-email": {
    title: "Correo masivo",
    description:
      "Personaliza un correo para cada contacto, valida las direcciones de correo y copia o exporta la lista.",
  },
  "audio-to-text": {
    title: "Audio a texto",
    description:
      "Convierte grabaciones de audio en texto editable con transcripción privada en el navegador. Tu archivo de audio nunca se sube.",
  },
};

const toolTextFr: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Étiquette d'expédition et facture PDF",
    description:
      "Ajuste les étiquettes d'expédition et les factures de n'importe quel PDF sur des pages d'impression exactes 4×6, 100×150 mm ou personnalisées, sans déformation ni coupe.",
  },
  compressor: {
    title: "Compresseur d'images",
    description:
      "Réduisez la taille du fichier image tout en conservant une excellente qualité.",
  },
  "favicon-generator": {
    title: "Générateur de favicons",
    description:
      "Créez des images favicon en plusieurs tailles à partir de fichiers PNG, JPG, WebP ou SVG.",
  },
  "qr-code-generator": {
    title: "Générateur de codes QR",
    description:
      "Créez instantanément des codes QR à partir d'URL, de texte et d'autres informations.",
  },
  "unit-converter": {
    title: "Convertisseur d'unités",
    description:
      "Convertissez instantanément des unités de longueur, de poids et de température avec un convertisseur en ligne simple.",
  },
  "percentage-calculator": {
    title: "Calculateur de pourcentage",
    description:
      "Calculez rapidement et facilement un pourcentage de n'importe quel nombre.",
  },
  "case-converter": {
    title: "Convertisseur de casse",
    description:
      "Convertissez instantanément du texte en majuscules, minuscules, casse de titre ou de phrase.",
  },
  "character-counter": {
    title: "Compteur de caractères",
    description:
      "Comptez instantanément les caractères, espaces, mots, phrases et paragraphes.",
  },
  "word-counter": {
    title: "Compteur de mots",
    description:
      "Comptez instantanément les mots, caractères, phrases, paragraphes et lignes.",
  },
  "heic-to-jpg": {
    title: "HEIC en JPG",
    description: "Convertissez gratuitement en ligne des images HEIC et HEIF en JPG.",
  },
  "compress-image-to-kb": {
    title: "Compresser une image en Ko",
    description:
      "Compressez des images à 20Ko, 50Ko, 100Ko, 200Ko ou une taille personnalisée.",
  },
  "image-to-text": {
    title: "Image en texte",
    description:
      "Extrayez le texte des images JPG, PNG, WebP et autres grâce à l'OCR dans le navigateur.",
  },
  converter: {
    title: "Convertisseur d'images",
    description:
      "Convertissez les formats d'image populaires JPG, PNG, WebP et autres.",
  },
  resizer: {
    title: "Redimensionneur d'images",
    description: "Redimensionnez vos images aux dimensions exactes en quelques secondes.",
  },
  cropper: {
    title: "Recadreur d'images",
    description: "Recadrez vos images rapidement avec des dimensions précises.",
  },
  "image-to-pdf": {
    title: "Image en PDF",
    description: "Transformez une ou plusieurs images en document PDF.",
  },
  "webp-converter": {
    title: "Convertisseur WebP",
    description: "Convertissez des images au format WebP, rapide et efficace.",
  },
  rotator: {
    title: "Rotateur d'images",
    description: "Faites pivoter et redressez vos images en toute simplicité.",
  },
  enhancer: {
    title: "Améliorateur d'images",
    description: "Améliorez la netteté et la qualité visuelle de vos images.",
  },
  "background-remover": {
    title: "Suppression d'arrière-plan",
    description:
      "Supprimez l'arrière-plan des images et remplacez-le par des couleurs professionnelles.",
  },
  "image-metadata": {
    title: "Outil de métadonnées d'image",
    description:
      "Consultez les métadonnées, inspectez les informations EXIF, supprimez les métadonnées et téléchargez une image propre.",
  },
  "passport-photo": {
    title: "Photo format passeport",
    description:
      "Créez des photos au format passeport standard et des planches de photos imprimables.",
  },
  "batch-converter": {
    title: "Convertisseur par lots",
    description: "Traitez plusieurs images ensemble dans un seul flux de travail.",
  },
  "image-to-word": {
    title: "Image en Word",
    description: "Convertissez une ou plusieurs images en document Word.",
  },
  "word-to-image": {
    title: "Word en image",
    description: "Convertissez rapidement votre document Word en image.",
  },
  "pdf-merger": {
    title: "Fusionner des PDF",
    description: "Combinez plusieurs fichiers PDF en un seul document.",
  },
  "pdf-splitter": {
    title: "Diviser un PDF",
    description: "Divisez un PDF en documents séparés rapidement et facilement.",
  },
  "pdf-compressor": {
    title: "Compresser un PDF",
    description:
      "Réduisez la taille du fichier PDF tout en gardant vos documents faciles à utiliser.",
  },
  "pdf-to-word": {
    title: "PDF en Word",
    description: "Convertissez des fichiers PDF en documents Word modifiables.",
  },
  "pdf-to-powerpoint": {
    title: "PDF en PowerPoint",
    description: "Convertissez des fichiers PDF en présentations PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF en Excel",
    description: "Convertissez des fichiers PDF en feuilles de calcul Excel.",
  },
  "word-to-pdf": {
    title: "Word en PDF",
    description: "Convertissez des documents Word en fichiers PDF.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint en PDF",
    description: "Convertissez des présentations PowerPoint en fichiers PDF.",
  },
  "excel-to-pdf": {
    title: "Excel en PDF",
    description: "Convertissez des feuilles de calcul Excel en fichiers PDF.",
  },
  "pdf-editor": {
    title: "Éditeur PDF",
    description: "Ajoutez du texte à vos pages PDF et modifiez vos documents.",
  },
  "pdf-to-jpg": {
    title: "PDF en JPG",
    description: "Convertissez les pages PDF en images JPG.",
  },
  "pdf-signer": {
    title: "Signer un PDF",
    description: "Ajoutez votre signature aux documents PDF.",
  },
  "pdf-watermark": {
    title: "Filigrane PDF",
    description: "Ajoutez un filigrane personnalisé à chaque page de votre PDF.",
  },
  "pdf-rotator": {
    title: "Pivoter un PDF",
    description: "Faites pivoter les pages PDF dans la bonne orientation.",
  },
  "html-to-pdf": {
    title: "HTML en PDF",
    description: "Convertissez du contenu HTML en document PDF.",
  },
  "pdf-unlocker": {
    title: "Déverrouiller un PDF",
    description:
      "Supprimez les restrictions PDF des documents que vous êtes autorisé à modifier.",
  },
  "pdf-protector": {
    title: "Protéger un PDF",
    description: "Ajoutez des paramètres de protection à vos documents PDF.",
  },
  "pdf-organizer": {
    title: "Organiser un PDF",
    description: "Réorganisez, organisez et combinez des fichiers PDF.",
  },
  "pdf-to-pdfa": {
    title: "PDF en PDF/A",
    description: "Préparez des documents PDF pour l'archivage à long terme.",
  },
  "pdf-repair": {
    title: "Réparer un PDF",
    description:
      "Essayez de réparer les fichiers PDF présentant de petits problèmes de structure.",
  },
  "pdf-page-numbers": {
    title: "Ajouter des numéros de page PDF",
    description: "Ajoutez des numéros de page à vos documents PDF.",
  },
  "scan-to-pdf": {
    title: "Numériser en PDF",
    description: "Convertissez des images numérisées en document PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Extrayez du texte recherchable à partir de documents PDF numérisés.",
  },
  "pdf-comparer": {
    title: "Comparer des PDF",
    description: "Comparez deux documents PDF et identifiez les différences de base.",
  },
  "pdf-redactor": {
    title: "Masquer un PDF",
    description: "Masquez les informations sensibles dans les documents PDF.",
  },
  "pdf-cropper": {
    title: "Rogner un PDF",
    description: "Rognez les pages PDF et supprimez les marges indésirables.",
  },
  "pdf-forms": {
    title: "Formulaires PDF",
    description:
      "Remplissez les champs de formulaire PDF et ajoutez des informations aux documents.",
  },
  "pdf-summarizer": {
    title: "Résumeur de PDF",
    description: "Résumez des documents PDF et comprenez le contenu clé.",
  },
  "pdf-translator": {
    title: "Traducteur PDF",
    description: "Traduisez des documents PDF dans votre langue préférée.",
  },
  "pdf-to-markdown": {
    title: "PDF en Markdown",
    description: "Convertissez des documents PDF en fichiers Markdown.",
  },
  "social-qr-card": {
    title: "Carte QR pour réseaux sociaux",
    description:
      "Créez un seul code QR pour WhatsApp, Instagram, Facebook, X, YouTube et autres liens sociaux.",
  },
  "video-to-link": {
    title: "Vidéo → Lien",
    description:
      "Téléversez une vidéo et créez un lien partageable avec une durée d'expiration.",
  },
  "bulk-sms": {
    title: "SMS en masse",
    description:
      "Personnalisez un SMS pour chaque contact, vérifiez les numéros de téléphone et copiez ou exportez la liste.",
  },
  "bulk-email": {
    title: "E-mail en masse",
    description:
      "Personnalisez un e-mail pour chaque contact, vérifiez les adresses e-mail et copiez ou exportez la liste.",
  },
  "audio-to-text": {
    title: "Audio en texte",
    description:
      "Transformez des enregistrements audio en texte modifiable avec une transcription privée dans le navigateur. Votre fichier audio n'est jamais envoyé.",
  },
};

const toolTextDe: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Versandetikett & Rechnung PDF",
    description:
      "Passt Versandetiketten und Rechnungen aus jedem PDF auf exakte 4×6-, 100×150-mm- oder eigene Druckseiten an — ohne Verzerren oder Abschneiden.",
  },
  compressor: {
    title: "Bildkomprimierer",
    description: "Reduzieren Sie die Bilddateigröße bei hervorragender Qualität.",
  },
  "favicon-generator": {
    title: "Favicon-Generator",
    description:
      "Erstellen Sie Favicon-Bilder in mehreren Größen aus PNG-, JPG-, WebP- oder SVG-Dateien.",
  },
  "qr-code-generator": {
    title: "QR-Code-Generator",
    description:
      "Erstellen Sie sofort QR-Codes aus URLs, Text und anderen Informationen.",
  },
  "unit-converter": {
    title: "Einheitenumrechner",
    description:
      "Rechnen Sie Längen-, Gewichts- und Temperatureinheiten sofort mit einem einfachen Online-Rechner um.",
  },
  "percentage-calculator": {
    title: "Prozentrechner",
    description:
      "Berechnen Sie schnell und einfach einen Prozentsatz einer beliebigen Zahl.",
  },
  "case-converter": {
    title: "Schreibweisen-Konverter",
    description:
      "Wandeln Sie Text sofort in Großbuchstaben, Kleinbuchstaben, Titel- oder Satzschreibweise um.",
  },
  "character-counter": {
    title: "Zeichenzähler",
    description:
      "Zählen Sie sofort Zeichen, Leerzeichen, Wörter, Sätze und Absätze.",
  },
  "word-counter": {
    title: "Wortzähler",
    description:
      "Zählen Sie sofort Wörter, Zeichen, Sätze, Absätze und Zeilen.",
  },
  "heic-to-jpg": {
    title: "HEIC zu JPG",
    description: "Konvertieren Sie HEIC- und HEIF-Bilder kostenlos online in JPG.",
  },
  "compress-image-to-kb": {
    title: "Bild auf KB komprimieren",
    description:
      "Komprimieren Sie Bilder auf 20KB, 50KB, 100KB, 200KB oder eine benutzerdefinierte Größe.",
  },
  "image-to-text": {
    title: "Bild zu Text",
    description:
      "Extrahieren Sie Text aus JPG-, PNG-, WebP- und anderen Bildern mit OCR im Browser.",
  },
  converter: {
    title: "Bildkonverter",
    description:
      "Konvertieren Sie JPG, PNG, WebP und andere gängige Bildformate.",
  },
  resizer: {
    title: "Bildgröße ändern",
    description: "Ändern Sie Bilder in Sekunden auf exakte Abmessungen.",
  },
  cropper: {
    title: "Bildzuschnitt",
    description: "Schneiden Sie Ihre Bilder schnell mit präzisen Abmessungen zu.",
  },
  "image-to-pdf": {
    title: "Bild zu PDF",
    description: "Wandeln Sie ein oder mehrere Bilder in ein PDF-Dokument um.",
  },
  "webp-converter": {
    title: "WebP-Konverter",
    description: "Konvertieren Sie Bilder in das schnelle und effiziente WebP-Format.",
  },
  rotator: {
    title: "Bild drehen",
    description: "Drehen und begradigen Sie Ihre Bilder mühelos.",
  },
  enhancer: {
    title: "Bildverbesserer",
    description: "Verbessern Sie Klarheit und visuelle Qualität Ihrer Bilder.",
  },
  "background-remover": {
    title: "Hintergrundentferner",
    description:
      "Entfernen Sie Bildhintergründe und ersetzen Sie sie durch professionelle Farben.",
  },
  "image-metadata": {
    title: "Bild-Metadaten-Tool",
    description:
      "Zeigen Sie Bildmetadaten an, prüfen Sie EXIF-Informationen, entfernen Sie Metadaten und laden Sie ein sauberes Bild herunter.",
  },
  "passport-photo": {
    title: "Passfoto",
    description:
      "Erstellen Sie Passfotos in Standardgröße und druckbare Fotobögen.",
  },
  "batch-converter": {
    title: "Stapelkonverter",
    description: "Verarbeiten Sie mehrere Bilder in einem Arbeitsablauf.",
  },
  "image-to-word": {
    title: "Bild zu Word",
    description: "Konvertieren Sie ein oder mehrere Bilder in ein Word-Dokument.",
  },
  "word-to-image": {
    title: "Word zu Bild",
    description: "Konvertieren Sie Ihr Word-Dokument schnell in ein Bild.",
  },
  "pdf-merger": {
    title: "PDF zusammenfügen",
    description: "Fügen Sie mehrere PDF-Dateien zu einem Dokument zusammen.",
  },
  "pdf-splitter": {
    title: "PDF teilen",
    description: "Teilen Sie ein PDF schnell und einfach in separate Dokumente auf.",
  },
  "pdf-compressor": {
    title: "PDF komprimieren",
    description:
      "Reduzieren Sie die PDF-Dateigröße, während Ihre Dokumente nutzbar bleiben.",
  },
  "pdf-to-word": {
    title: "PDF zu Word",
    description: "Konvertieren Sie PDF-Dateien in bearbeitbare Word-Dokumente.",
  },
  "pdf-to-powerpoint": {
    title: "PDF zu PowerPoint",
    description: "Konvertieren Sie PDF-Dateien in PowerPoint-Präsentationen.",
  },
  "pdf-to-excel": {
    title: "PDF zu Excel",
    description: "Konvertieren Sie PDF-Dateien in Excel-Tabellen.",
  },
  "word-to-pdf": {
    title: "Word zu PDF",
    description: "Konvertieren Sie Word-Dokumente in PDF-Dateien.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint zu PDF",
    description: "Konvertieren Sie PowerPoint-Präsentationen in PDF-Dateien.",
  },
  "excel-to-pdf": {
    title: "Excel zu PDF",
    description: "Konvertieren Sie Excel-Tabellen in PDF-Dateien.",
  },
  "pdf-editor": {
    title: "PDF-Editor",
    description:
      "Fügen Sie Text zu Ihren PDF-Seiten hinzu und bearbeiten Sie Ihre Dokumente.",
  },
  "pdf-to-jpg": {
    title: "PDF zu JPG",
    description: "Konvertieren Sie PDF-Seiten in JPG-Bilder.",
  },
  "pdf-signer": {
    title: "PDF signieren",
    description: "Fügen Sie Ihre Unterschrift zu PDF-Dokumenten hinzu.",
  },
  "pdf-watermark": {
    title: "PDF-Wasserzeichen",
    description:
      "Fügen Sie jeder Seite Ihres PDFs ein benutzerdefiniertes Wasserzeichen hinzu.",
  },
  "pdf-rotator": {
    title: "PDF drehen",
    description: "Drehen Sie PDF-Seiten in die richtige Ausrichtung.",
  },
  "html-to-pdf": {
    title: "HTML zu PDF",
    description: "Konvertieren Sie HTML-Inhalte in ein PDF-Dokument.",
  },
  "pdf-unlocker": {
    title: "PDF entsperren",
    description:
      "Entfernen Sie PDF-Beschränkungen von Dokumenten, die Sie bearbeiten dürfen.",
  },
  "pdf-protector": {
    title: "PDF schützen",
    description: "Fügen Sie Schutzoptionen zu Ihren PDF-Dokumenten hinzu.",
  },
  "pdf-organizer": {
    title: "PDF organisieren",
    description: "Ordnen Sie PDF-Dateien neu, organisieren und kombinieren Sie sie.",
  },
  "pdf-to-pdfa": {
    title: "PDF zu PDF/A",
    description: "Bereiten Sie PDF-Dokumente für die Langzeitarchivierung vor.",
  },
  "pdf-repair": {
    title: "PDF reparieren",
    description:
      "Versuchen Sie, PDF-Dateien mit kleineren strukturellen Problemen zu reparieren.",
  },
  "pdf-page-numbers": {
    title: "PDF-Seitenzahlen hinzufügen",
    description: "Fügen Sie Seitenzahlen zu Ihren PDF-Dokumenten hinzu.",
  },
  "scan-to-pdf": {
    title: "Scannen zu PDF",
    description: "Konvertieren Sie gescannte Bilder in ein PDF-Dokument.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Extrahieren Sie durchsuchbaren Text aus gescannten PDF-Dokumenten.",
  },
  "pdf-comparer": {
    title: "PDF vergleichen",
    description:
      "Vergleichen Sie zwei PDF-Dokumente und erkennen Sie grundlegende Unterschiede.",
  },
  "pdf-redactor": {
    title: "PDF schwärzen",
    description: "Blenden Sie vertrauliche Informationen in PDF-Dokumenten aus.",
  },
  "pdf-cropper": {
    title: "PDF zuschneiden",
    description: "Schneiden Sie PDF-Seiten zu und entfernen Sie unerwünschte Ränder.",
  },
  "pdf-forms": {
    title: "PDF-Formulare",
    description:
      "Füllen Sie PDF-Formularfelder aus und fügen Sie Informationen zu Dokumenten hinzu.",
  },
  "pdf-summarizer": {
    title: "PDF-Zusammenfassung",
    description: "Fassen Sie PDF-Dokumente zusammen und erfassen Sie die Kerninhalte.",
  },
  "pdf-translator": {
    title: "PDF-Übersetzer",
    description: "Übersetzen Sie PDF-Dokumente in Ihre bevorzugte Sprache.",
  },
  "pdf-to-markdown": {
    title: "PDF zu Markdown",
    description: "Konvertieren Sie PDF-Dokumente in Markdown-Dateien.",
  },
  "social-qr-card": {
    title: "Social-Media-QR-Karte",
    description:
      "Erstellen Sie einen einzigen QR-Code für WhatsApp, Instagram, Facebook, X, YouTube und andere soziale Links.",
  },
  "video-to-link": {
    title: "Video → Link",
    description:
      "Laden Sie ein Video hoch und erstellen Sie einen teilbaren Link mit Ablaufzeit.",
  },
  "bulk-sms": {
    title: "Bulk-SMS",
    description:
      "Erstelle eine personalisierte SMS für jeden Kontakt, prüfe die Telefonnummern und kopiere oder exportiere die Liste.",
  },
  "bulk-email": {
    title: "Bulk-E-Mail",
    description:
      "Erstelle eine personalisierte E-Mail für jeden Kontakt, prüfe die E-Mail-Adressen und kopiere oder exportiere die Liste.",
  },
  "audio-to-text": {
    title: "Audio in Text",
    description:
      "Wandeln Sie Audioaufnahmen mit privater Transkription im Browser in bearbeitbaren Text um. Ihre Audiodatei wird nie hochgeladen.",
  },
};

const toolTextIt: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Etichetta di spedizione e fattura PDF",
    description:
      "Adatta etichette di spedizione e fatture di qualsiasi PDF su pagine di stampa esatte 4×6, 100×150 mm o personalizzate, senza stirare o tagliare il contenuto.",
  },
  compressor: {
    title: "Compressore di immagini",
    description:
      "Riduci le dimensioni del file immagine mantenendo un'ottima qualità.",
  },
  "favicon-generator": {
    title: "Generatore di favicon",
    description:
      "Crea immagini favicon in più dimensioni da file PNG, JPG, WebP o SVG.",
  },
  "qr-code-generator": {
    title: "Generatore di codici QR",
    description:
      "Crea codici QR da URL, testo e altre informazioni all'istante.",
  },
  "unit-converter": {
    title: "Convertitore di unità",
    description:
      "Converti istantaneamente unità di lunghezza, peso e temperatura con un semplice convertitore online.",
  },
  "percentage-calculator": {
    title: "Calcolatore di percentuali",
    description: "Calcola una percentuale di qualsiasi numero in modo rapido e semplice.",
  },
  "case-converter": {
    title: "Convertitore di maiuscole e minuscole",
    description:
      "Converti il testo in maiuscolo, minuscolo, formato titolo o frase all'istante.",
  },
  "character-counter": {
    title: "Contatore di caratteri",
    description:
      "Conta caratteri, spazi, parole, frasi e paragrafi all'istante.",
  },
  "word-counter": {
    title: "Contatore di parole",
    description:
      "Conta parole, caratteri, frasi, paragrafi e righe all'istante.",
  },
  "heic-to-jpg": {
    title: "HEIC in JPG",
    description: "Converti gratis online immagini HEIC e HEIF in JPG.",
  },
  "compress-image-to-kb": {
    title: "Comprimi immagine in KB",
    description:
      "Comprimi immagini a 20KB, 50KB, 100KB, 200KB o a una dimensione personalizzata.",
  },
  "image-to-text": {
    title: "Immagine in testo",
    description:
      "Estrai testo da JPG, PNG, WebP e altre immagini con OCR nel browser.",
  },
  converter: {
    title: "Convertitore di immagini",
    description:
      "Converti JPG, PNG, WebP e altri formati di immagine diffusi.",
  },
  resizer: {
    title: "Ridimensionatore di immagini",
    description: "Ridimensiona le immagini alle dimensioni esatte in pochi secondi.",
  },
  cropper: {
    title: "Ritagliatore di immagini",
    description: "Ritaglia rapidamente le immagini con dimensioni precise.",
  },
  "image-to-pdf": {
    title: "Immagine in PDF",
    description: "Trasforma una o più immagini in un documento PDF.",
  },
  "webp-converter": {
    title: "Convertitore WebP",
    description: "Converti le immagini nel formato WebP, veloce ed efficiente.",
  },
  rotator: {
    title: "Rotatore di immagini",
    description: "Ruota e raddrizza le immagini con facilità.",
  },
  enhancer: {
    title: "Miglioratore di immagini",
    description: "Migliora la chiarezza e la qualità visiva delle immagini.",
  },
  "background-remover": {
    title: "Rimozione dello sfondo",
    description:
      "Rimuovi lo sfondo delle immagini e sostituiscilo con colori professionali.",
  },
  "image-metadata": {
    title: "Strumento metadati immagine",
    description:
      "Visualizza i metadati, controlla le informazioni EXIF, rimuovi i metadati e scarica un'immagine pulita.",
  },
  "passport-photo": {
    title: "Foto formato passaporto",
    description:
      "Crea foto di formato passaporto standard e fogli di foto stampabili.",
  },
  "batch-converter": {
    title: "Convertitore in batch",
    description: "Elabora più immagini insieme in un unico flusso di lavoro.",
  },
  "image-to-word": {
    title: "Immagine in Word",
    description: "Converti una o più immagini in un documento Word.",
  },
  "word-to-image": {
    title: "Word in immagine",
    description: "Converti rapidamente il tuo documento Word in un'immagine.",
  },
  "pdf-merger": {
    title: "Unisci PDF",
    description: "Combina più file PDF in un unico documento.",
  },
  "pdf-splitter": {
    title: "Dividi PDF",
    description: "Dividi un PDF in documenti separati in modo rapido e semplice.",
  },
  "pdf-compressor": {
    title: "Comprimi PDF",
    description:
      "Riduci le dimensioni del file PDF mantenendo i documenti facili da usare.",
  },
  "pdf-to-word": {
    title: "PDF in Word",
    description: "Converti i file PDF in documenti Word modificabili.",
  },
  "pdf-to-powerpoint": {
    title: "PDF in PowerPoint",
    description: "Converti i file PDF in presentazioni PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF in Excel",
    description: "Converti i file PDF in fogli di calcolo Excel.",
  },
  "word-to-pdf": {
    title: "Word in PDF",
    description: "Converti i documenti Word in file PDF.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint in PDF",
    description: "Converti le presentazioni PowerPoint in file PDF.",
  },
  "excel-to-pdf": {
    title: "Excel in PDF",
    description: "Converti i fogli di calcolo Excel in file PDF.",
  },
  "pdf-editor": {
    title: "Editor PDF",
    description: "Aggiungi testo alle pagine PDF e modifica i tuoi documenti.",
  },
  "pdf-to-jpg": {
    title: "PDF in JPG",
    description: "Converti le pagine PDF in immagini JPG.",
  },
  "pdf-signer": {
    title: "Firma PDF",
    description: "Aggiungi la tua firma ai documenti PDF.",
  },
  "pdf-watermark": {
    title: "Filigrana PDF",
    description: "Aggiungi una filigrana personalizzata a ogni pagina del tuo PDF.",
  },
  "pdf-rotator": {
    title: "Ruota PDF",
    description: "Ruota le pagine PDF nell'orientamento corretto.",
  },
  "html-to-pdf": {
    title: "HTML in PDF",
    description: "Converti contenuti HTML in un documento PDF.",
  },
  "pdf-unlocker": {
    title: "Sblocca PDF",
    description:
      "Rimuovi le restrizioni PDF dai documenti che sei autorizzato a modificare.",
  },
  "pdf-protector": {
    title: "Proteggi PDF",
    description: "Aggiungi impostazioni di protezione ai tuoi documenti PDF.",
  },
  "pdf-organizer": {
    title: "Organizza PDF",
    description: "Riordina, organizza e combina file PDF.",
  },
  "pdf-to-pdfa": {
    title: "PDF in PDF/A",
    description: "Prepara i documenti PDF per l'archiviazione a lungo termine.",
  },
  "pdf-repair": {
    title: "Ripara PDF",
    description: "Prova a riparare file PDF con lievi problemi strutturali.",
  },
  "pdf-page-numbers": {
    title: "Aggiungi numeri di pagina PDF",
    description: "Aggiungi numeri di pagina ai tuoi documenti PDF.",
  },
  "scan-to-pdf": {
    title: "Scansione in PDF",
    description: "Converti immagini scansionate in un documento PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Estrai testo ricercabile da documenti PDF scansionati.",
  },
  "pdf-comparer": {
    title: "Confronta PDF",
    description: "Confronta due documenti PDF e individua le differenze principali.",
  },
  "pdf-redactor": {
    title: "Oscura PDF",
    description: "Nascondi informazioni sensibili nei documenti PDF.",
  },
  "pdf-cropper": {
    title: "Ritaglia PDF",
    description: "Ritaglia le pagine PDF e rimuovi i margini indesiderati.",
  },
  "pdf-forms": {
    title: "Moduli PDF",
    description:
      "Compila i campi dei moduli PDF e aggiungi informazioni ai documenti.",
  },
  "pdf-summarizer": {
    title: "Riassuntore PDF",
    description: "Riassumi i documenti PDF e comprendi i contenuti chiave.",
  },
  "pdf-translator": {
    title: "Traduttore PDF",
    description: "Traduci i documenti PDF nella tua lingua preferita.",
  },
  "pdf-to-markdown": {
    title: "PDF in Markdown",
    description: "Converti i documenti PDF in file Markdown.",
  },
  "social-qr-card": {
    title: "Scheda QR per social media",
    description:
      "Crea un unico codice QR per WhatsApp, Instagram, Facebook, X, YouTube e altri link social.",
  },
  "video-to-link": {
    title: "Video → Link",
    description:
      "Carica un video e crea un link condivisibile con un tempo di scadenza.",
  },
  "bulk-sms": {
    title: "SMS in blocco",
    description:
      "Personalizza un SMS per ogni contatto, verifica i numeri di telefono e copia o esporta l'elenco.",
  },
  "bulk-email": {
    title: "E-mail in blocco",
    description:
      "Personalizza un'e-mail per ogni contatto, verifica gli indirizzi e-mail e copia o esporta l'elenco.",
  },
  "audio-to-text": {
    title: "Audio in testo",
    description:
      "Trasforma le registrazioni audio in testo modificabile con trascrizione privata nel browser. Il file audio non viene mai caricato.",
  },
};

const toolTextPt: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Etiqueta de envio e fatura PDF",
    description:
      "Ajuste etiquetas de envio e faturas de qualquer PDF para páginas de impressão exatas de 4×6, 100×150 mm ou personalizadas, sem esticar nem cortar.",
  },
  compressor: {
    title: "Compressor de imagens",
    description:
      "Reduza o tamanho do arquivo de imagem mantendo uma excelente qualidade.",
  },
  "favicon-generator": {
    title: "Gerador de favicons",
    description:
      "Crie imagens favicon em vários tamanhos a partir de arquivos PNG, JPG, WebP ou SVG.",
  },
  "qr-code-generator": {
    title: "Gerador de códigos QR",
    description:
      "Crie códigos QR a partir de URLs, texto e outras informações instantaneamente.",
  },
  "unit-converter": {
    title: "Conversor de unidades",
    description:
      "Converta unidades de comprimento, peso e temperatura instantaneamente com um conversor online simples.",
  },
  "percentage-calculator": {
    title: "Calculadora de porcentagem",
    description: "Calcule a porcentagem de qualquer número de forma rápida e fácil.",
  },
  "case-converter": {
    title: "Conversor de maiúsculas e minúsculas",
    description:
      "Converta texto para maiúsculas, minúsculas, formato de título ou de frase instantaneamente.",
  },
  "character-counter": {
    title: "Contador de caracteres",
    description:
      "Conte caracteres, espaços, palavras, frases e parágrafos instantaneamente.",
  },
  "word-counter": {
    title: "Contador de palavras",
    description:
      "Conte palavras, caracteres, frases, parágrafos e linhas instantaneamente.",
  },
  "heic-to-jpg": {
    title: "HEIC para JPG",
    description: "Converta imagens HEIC e HEIF para JPG online gratuitamente.",
  },
  "compress-image-to-kb": {
    title: "Comprimir imagem para KB",
    description:
      "Comprima imagens para 20KB, 50KB, 100KB, 200KB ou um tamanho personalizado.",
  },
  "image-to-text": {
    title: "Imagem para texto",
    description:
      "Extraia texto de JPG, PNG, WebP e outras imagens com OCR no navegador.",
  },
  converter: {
    title: "Conversor de imagens",
    description:
      "Converta JPG, PNG, WebP e outros formatos de imagem populares.",
  },
  resizer: {
    title: "Redimensionador de imagens",
    description: "Redimensione suas imagens para as dimensões exatas em segundos.",
  },
  cropper: {
    title: "Cortador de imagens",
    description: "Corte suas imagens rapidamente com dimensões precisas.",
  },
  "image-to-pdf": {
    title: "Imagem para PDF",
    description: "Transforme uma ou várias imagens em um documento PDF.",
  },
  "webp-converter": {
    title: "Conversor WebP",
    description: "Converta imagens para o formato WebP, rápido e eficiente.",
  },
  rotator: {
    title: "Rotacionador de imagens",
    description: "Gire e endireite suas imagens com facilidade.",
  },
  enhancer: {
    title: "Melhorador de imagens",
    description: "Melhore a clareza e a qualidade visual da imagem.",
  },
  "background-remover": {
    title: "Removedor de fundo",
    description:
      "Remova o fundo das imagens e substitua-o por cores profissionais.",
  },
  "image-metadata": {
    title: "Ferramenta de metadados de imagem",
    description:
      "Veja os metadados, inspecione informações EXIF, remova metadados e baixe uma imagem limpa.",
  },
  "passport-photo": {
    title: "Foto tamanho passaporte",
    description:
      "Crie fotos no tamanho padrão de passaporte e folhas de fotos para impressão.",
  },
  "batch-converter": {
    title: "Conversor em lote",
    description: "Processe várias imagens juntas em um único fluxo de trabalho.",
  },
  "image-to-word": {
    title: "Imagem para Word",
    description: "Converta uma ou várias imagens em um documento do Word.",
  },
  "word-to-image": {
    title: "Word para imagem",
    description: "Converta seu documento do Word em uma imagem rapidamente.",
  },
  "pdf-merger": {
    title: "Unir PDF",
    description: "Combine vários arquivos PDF em um único documento.",
  },
  "pdf-splitter": {
    title: "Dividir PDF",
    description: "Divida um PDF em documentos separados de forma rápida e fácil.",
  },
  "pdf-compressor": {
    title: "Comprimir PDF",
    description:
      "Reduza o tamanho do arquivo PDF mantendo os documentos fáceis de usar.",
  },
  "pdf-to-word": {
    title: "PDF para Word",
    description: "Converta arquivos PDF em documentos do Word editáveis.",
  },
  "pdf-to-powerpoint": {
    title: "PDF para PowerPoint",
    description: "Converta arquivos PDF em apresentações do PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF para Excel",
    description: "Converta arquivos PDF em planilhas do Excel.",
  },
  "word-to-pdf": {
    title: "Word para PDF",
    description: "Converta documentos do Word em arquivos PDF.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint para PDF",
    description: "Converta apresentações do PowerPoint em arquivos PDF.",
  },
  "excel-to-pdf": {
    title: "Excel para PDF",
    description: "Converta planilhas do Excel em arquivos PDF.",
  },
  "pdf-editor": {
    title: "Editor de PDF",
    description: "Adicione texto às páginas do seu PDF e edite seus documentos.",
  },
  "pdf-to-jpg": {
    title: "PDF para JPG",
    description: "Converta páginas de PDF em imagens JPG.",
  },
  "pdf-signer": {
    title: "Assinar PDF",
    description: "Adicione sua assinatura a documentos PDF.",
  },
  "pdf-watermark": {
    title: "Marca d'água PDF",
    description: "Adicione uma marca d'água personalizada a cada página do seu PDF.",
  },
  "pdf-rotator": {
    title: "Girar PDF",
    description: "Gire as páginas do PDF para a orientação correta.",
  },
  "html-to-pdf": {
    title: "HTML para PDF",
    description: "Converta conteúdo HTML em um documento PDF.",
  },
  "pdf-unlocker": {
    title: "Desbloquear PDF",
    description:
      "Remova restrições de PDF de documentos que você tem autorização para editar.",
  },
  "pdf-protector": {
    title: "Proteger PDF",
    description: "Adicione configurações de proteção aos seus documentos PDF.",
  },
  "pdf-organizer": {
    title: "Organizar PDF",
    description: "Reordene, organize e combine arquivos PDF.",
  },
  "pdf-to-pdfa": {
    title: "PDF para PDF/A",
    description: "Prepare documentos PDF para arquivamento de longo prazo.",
  },
  "pdf-repair": {
    title: "Reparar PDF",
    description: "Tente reparar arquivos PDF com pequenos problemas estruturais.",
  },
  "pdf-page-numbers": {
    title: "Adicionar números de página ao PDF",
    description: "Adicione números de página aos seus documentos PDF.",
  },
  "scan-to-pdf": {
    title: "Digitalizar para PDF",
    description: "Converta imagens digitalizadas em um documento PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Extraia texto pesquisável de documentos PDF digitalizados.",
  },
  "pdf-comparer": {
    title: "Comparar PDF",
    description: "Compare dois documentos PDF e identifique diferenças básicas.",
  },
  "pdf-redactor": {
    title: "Tarjar PDF",
    description: "Oculte informações sensíveis em documentos PDF.",
  },
  "pdf-cropper": {
    title: "Cortar PDF",
    description: "Corte páginas do PDF e remova margens indesejadas.",
  },
  "pdf-forms": {
    title: "Formulários PDF",
    description:
      "Preencha campos de formulários PDF e adicione informações aos documentos.",
  },
  "pdf-summarizer": {
    title: "Resumidor de PDF",
    description: "Resuma documentos PDF e entenda o conteúdo principal.",
  },
  "pdf-translator": {
    title: "Tradutor de PDF",
    description: "Traduza documentos PDF para o idioma de sua preferência.",
  },
  "pdf-to-markdown": {
    title: "PDF para Markdown",
    description: "Converta documentos PDF em arquivos Markdown.",
  },
  "social-qr-card": {
    title: "Cartão QR para redes sociais",
    description:
      "Crie um único código QR para WhatsApp, Instagram, Facebook, X, YouTube e outros links sociais.",
  },
  "video-to-link": {
    title: "Vídeo → Link",
    description:
      "Envie um vídeo e crie um link compartilhável com prazo de validade.",
  },
  "bulk-sms": {
    title: "SMS em massa",
    description:
      "Personalize uma mensagem SMS para cada contato, valide os números de telefone e copie ou exporte a lista.",
  },
  "bulk-email": {
    title: "E-mail em massa",
    description:
      "Personalize um e-mail para cada contato, valide os endereços de e-mail e copie ou exporte a lista.",
  },
  "audio-to-text": {
    title: "Áudio em texto",
    description:
      "Transforme gravações de áudio em texto editável com transcrição privada no navegador. O seu ficheiro de áudio nunca é enviado.",
  },
};

const toolTextJa: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "発送ラベル・請求書PDF",
    description:
      "任意のPDFから発送ラベルや請求書を、4×6・100×150mm・カスタムの正確な印刷ページに合わせます。歪みや切り取りなし。",
  },
  compressor: {
    title: "画像圧縮ツール",
    description: "高品質を保ちながら画像ファイルのサイズを縮小します。",
  },
  "favicon-generator": {
    title: "ファビコン作成ツール",
    description:
      "PNG、JPG、WebP、SVG ファイルから複数サイズのファビコン画像を作成します。",
  },
  "qr-code-generator": {
    title: "QR コード作成ツール",
    description:
      "URL、テキストなどの情報から QR コードを即座に作成します。",
  },
  "unit-converter": {
    title: "単位変換ツール",
    description:
      "長さ、重さ、温度の単位を簡単なオンライン変換ツールで即座に変換します。",
  },
  "percentage-calculator": {
    title: "パーセント計算ツール",
    description: "任意の数値の割合をすばやく簡単に計算します。",
  },
  "case-converter": {
    title: "大文字小文字変換ツール",
    description:
      "テキストを大文字、小文字、タイトルケース、文頭大文字に即座に変換します。",
  },
  "character-counter": {
    title: "文字数カウンター",
    description: "文字、スペース、単語、文、段落を即座に数えます。",
  },
  "word-counter": {
    title: "単語カウンター",
    description: "単語、文字、文、段落、行を即座に数えます。",
  },
  "heic-to-jpg": {
    title: "HEIC から JPG",
    description: "HEIC および HEIF 画像を無料でオンラインで JPG に変換します。",
  },
  "compress-image-to-kb": {
    title: "画像を KB に圧縮",
    description:
      "画像を 20KB、50KB、100KB、200KB または任意のサイズに圧縮します。",
  },
  "image-to-text": {
    title: "画像からテキスト",
    description:
      "ブラウザベースの OCR で JPG、PNG、WebP などの画像からテキストを抽出します。",
  },
  converter: {
    title: "画像変換ツール",
    description: "JPG、PNG、WebP などの一般的な画像形式を変換します。",
  },
  resizer: {
    title: "画像リサイズツール",
    description: "画像を数秒で正確な寸法にリサイズします。",
  },
  cropper: {
    title: "画像トリミングツール",
    description: "正確な寸法で画像をすばやくトリミングします。",
  },
  "image-to-pdf": {
    title: "画像から PDF",
    description: "1 枚または複数の画像を PDF 文書に変換します。",
  },
  "webp-converter": {
    title: "WebP 変換ツール",
    description: "画像を高速で効率的な WebP 形式に変換します。",
  },
  rotator: {
    title: "画像回転ツール",
    description: "画像を簡単に回転・傾き補正します。",
  },
  enhancer: {
    title: "画像補正ツール",
    description: "画像の鮮明さと画質を向上させます。",
  },
  "background-remover": {
    title: "背景除去ツール",
    description:
      "画像の背景を削除し、プロフェッショナルな色に置き換えます。",
  },
  "image-metadata": {
    title: "画像メタデータツール",
    description:
      "画像のメタデータを表示し、EXIF 情報を確認し、メタデータを削除してクリーンな画像をダウンロードします。",
  },
  "passport-photo": {
    title: "パスポートサイズ写真",
    description:
      "標準的なパスポートサイズの写真と印刷可能な写真シートを作成します。",
  },
  "batch-converter": {
    title: "一括変換ツール",
    description: "複数の画像を 1 つのワークフローでまとめて処理します。",
  },
  "image-to-word": {
    title: "画像から Word",
    description: "1 枚または複数の画像を Word 文書に変換します。",
  },
  "word-to-image": {
    title: "Word から画像",
    description: "Word 文書をすばやく画像に変換します。",
  },
  "pdf-merger": {
    title: "PDF 結合",
    description: "複数の PDF ファイルを 1 つの文書に結合します。",
  },
  "pdf-splitter": {
    title: "PDF 分割",
    description: "PDF をすばやく簡単に個別の文書に分割します。",
  },
  "pdf-compressor": {
    title: "PDF 圧縮",
    description:
      "文書を使いやすく保ちながら PDF ファイルのサイズを縮小します。",
  },
  "pdf-to-word": {
    title: "PDF から Word",
    description: "PDF ファイルを編集可能な Word 文書に変換します。",
  },
  "pdf-to-powerpoint": {
    title: "PDF から PowerPoint",
    description: "PDF ファイルを PowerPoint プレゼンテーションに変換します。",
  },
  "pdf-to-excel": {
    title: "PDF から Excel",
    description: "PDF ファイルを Excel スプレッドシートに変換します。",
  },
  "word-to-pdf": {
    title: "Word から PDF",
    description: "Word 文書を PDF ファイルに変換します。",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint から PDF",
    description: "PowerPoint プレゼンテーションを PDF ファイルに変換します。",
  },
  "excel-to-pdf": {
    title: "Excel から PDF",
    description: "Excel スプレッドシートを PDF ファイルに変換します。",
  },
  "pdf-editor": {
    title: "PDF エディター",
    description: "PDF ページにテキストを追加し、文書を編集します。",
  },
  "pdf-to-jpg": {
    title: "PDF から JPG",
    description: "PDF ページを JPG 画像に変換します。",
  },
  "pdf-signer": {
    title: "PDF 署名",
    description: "PDF 文書に署名を追加します。",
  },
  "pdf-watermark": {
    title: "PDF 透かし",
    description: "PDF のすべてのページにカスタム透かしを追加します。",
  },
  "pdf-rotator": {
    title: "PDF 回転",
    description: "PDF ページを正しい向きに回転します。",
  },
  "html-to-pdf": {
    title: "HTML から PDF",
    description: "HTML コンテンツを PDF 文書に変換します。",
  },
  "pdf-unlocker": {
    title: "PDF ロック解除",
    description:
      "編集する権限がある文書から PDF の制限を解除します。",
  },
  "pdf-protector": {
    title: "PDF 保護",
    description: "PDF 文書に保護設定を追加します。",
  },
  "pdf-organizer": {
    title: "PDF 整理",
    description: "PDF ファイルを並べ替え、整理し、結合します。",
  },
  "pdf-to-pdfa": {
    title: "PDF から PDF/A",
    description: "PDF 文書を長期保存用に準備します。",
  },
  "pdf-repair": {
    title: "PDF 修復",
    description: "軽微な構造上の問題がある PDF ファイルの修復を試みます。",
  },
  "pdf-page-numbers": {
    title: "PDF にページ番号を追加",
    description: "PDF 文書にページ番号を追加します。",
  },
  "scan-to-pdf": {
    title: "スキャンから PDF",
    description: "スキャンした画像を PDF 文書に変換します。",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "スキャンした PDF 文書から検索可能なテキストを抽出します。",
  },
  "pdf-comparer": {
    title: "PDF 比較",
    description: "2 つの PDF 文書を比較し、基本的な違いを特定します。",
  },
  "pdf-redactor": {
    title: "PDF 墨消し",
    description: "PDF 文書の機密情報を隠します。",
  },
  "pdf-cropper": {
    title: "PDF トリミング",
    description: "PDF ページをトリミングし、不要な余白を削除します。",
  },
  "pdf-forms": {
    title: "PDF フォーム",
    description:
      "PDF フォームのフィールドに入力し、文書に情報を追加します。",
  },
  "pdf-summarizer": {
    title: "PDF 要約ツール",
    description: "PDF 文書を要約し、重要な内容を把握します。",
  },
  "pdf-translator": {
    title: "PDF 翻訳ツール",
    description: "PDF 文書を希望する言語に翻訳します。",
  },
  "pdf-to-markdown": {
    title: "PDF から Markdown",
    description: "PDF 文書を Markdown ファイルに変換します。",
  },
  "social-qr-card": {
    title: "ソーシャルメディア QR カード",
    description:
      "WhatsApp、Instagram、Facebook、X、YouTube などのソーシャルリンク用の QR コードを 1 つ作成します。",
  },
  "video-to-link": {
    title: "動画 → リンク",
    description:
      "動画をアップロードし、有効期限付きの共有リンクを作成します。",
  },
  "bulk-sms": {
    title: "一括SMS作成",
    description:
      "連絡先ごとにSMSメッセージをパーソナライズし、電話番号を検証して一覧をコピーまたはエクスポートします。",
  },
  "bulk-email": {
    title: "一括メール作成",
    description:
      "連絡先ごとにメールをパーソナライズし、メールアドレスを検証して一覧をコピーまたはエクスポートします。",
  },
  "audio-to-text": {
    title: "音声をテキストに",
    description:
      "ブラウザ内で音声を編集可能なテキストに変換します。音声ファイルが外部に送信されることはありません。",
  },
};

const toolTextRu: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Транспортная накладная и счёт PDF",
    description:
      "Вкладывайте накладные и счёта из любого PDF в точные страницы 4×6, 100×150 мм или свои — без растяжения и обрезки.",
  },
  compressor: {
    title: "Сжатие изображений",
    description: "Уменьшайте размер файла изображения, сохраняя отличное качество.",
  },
  "favicon-generator": {
    title: "Генератор favicon",
    description:
      "Создавайте favicon-изображения разных размеров из файлов PNG, JPG, WebP или SVG.",
  },
  "qr-code-generator": {
    title: "Генератор QR-кодов",
    description:
      "Мгновенно создавайте QR-коды из ссылок, текста и другой информации.",
  },
  "unit-converter": {
    title: "Конвертер единиц",
    description:
      "Мгновенно переводите единицы длины, веса и температуры с помощью простого онлайн-конвертера.",
  },
  "percentage-calculator": {
    title: "Калькулятор процентов",
    description: "Быстро и легко вычисляйте процент от любого числа.",
  },
  "case-converter": {
    title: "Конвертер регистра",
    description:
      "Мгновенно преобразуйте текст в верхний, нижний регистр, регистр заголовка или предложения.",
  },
  "character-counter": {
    title: "Счётчик символов",
    description:
      "Мгновенно подсчитывайте символы, пробелы, слова, предложения и абзацы.",
  },
  "word-counter": {
    title: "Счётчик слов",
    description:
      "Мгновенно подсчитывайте слова, символы, предложения, абзацы и строки.",
  },
  "heic-to-jpg": {
    title: "HEIC в JPG",
    description: "Бесплатно конвертируйте изображения HEIC и HEIF в JPG онлайн.",
  },
  "compress-image-to-kb": {
    title: "Сжать изображение до КБ",
    description:
      "Сжимайте изображения до 20КБ, 50КБ, 100КБ, 200КБ или заданного размера.",
  },
  "image-to-text": {
    title: "Изображение в текст",
    description:
      "Извлекайте текст из JPG, PNG, WebP и других изображений с помощью OCR в браузере.",
  },
  converter: {
    title: "Конвертер изображений",
    description:
      "Конвертируйте JPG, PNG, WebP и другие популярные форматы изображений.",
  },
  resizer: {
    title: "Изменение размера изображений",
    description: "Изменяйте размер изображений до точных значений за секунды.",
  },
  cropper: {
    title: "Обрезка изображений",
    description: "Быстро обрезайте изображения с точными размерами.",
  },
  "image-to-pdf": {
    title: "Изображение в PDF",
    description: "Преобразуйте одно или несколько изображений в документ PDF.",
  },
  "webp-converter": {
    title: "Конвертер WebP",
    description: "Конвертируйте изображения в быстрый и эффективный формат WebP.",
  },
  rotator: {
    title: "Поворот изображений",
    description: "Легко поворачивайте и выравнивайте изображения.",
  },
  enhancer: {
    title: "Улучшение изображений",
    description: "Повышайте чёткость и визуальное качество изображений.",
  },
  "background-remover": {
    title: "Удаление фона",
    description:
      "Удаляйте фон изображений и заменяйте его профессиональными цветами.",
  },
  "image-metadata": {
    title: "Инструмент метаданных изображения",
    description:
      "Просматривайте метаданные, проверяйте информацию EXIF, удаляйте метаданные и скачивайте чистое изображение.",
  },
  "passport-photo": {
    title: "Фото размером с паспорт",
    description:
      "Создавайте фото стандартного паспортного размера и листы для печати.",
  },
  "batch-converter": {
    title: "Пакетный конвертер",
    description: "Обрабатывайте несколько изображений в одном рабочем процессе.",
  },
  "image-to-word": {
    title: "Изображение в Word",
    description: "Конвертируйте одно или несколько изображений в документ Word.",
  },
  "word-to-image": {
    title: "Word в изображение",
    description: "Быстро конвертируйте документ Word в изображение.",
  },
  "pdf-merger": {
    title: "Объединить PDF",
    description: "Объедините несколько PDF-файлов в один документ.",
  },
  "pdf-splitter": {
    title: "Разделить PDF",
    description: "Быстро и легко разделите PDF на отдельные документы.",
  },
  "pdf-compressor": {
    title: "Сжать PDF",
    description:
      "Уменьшайте размер PDF-файла, сохраняя документы удобными для использования.",
  },
  "pdf-to-word": {
    title: "PDF в Word",
    description: "Конвертируйте PDF-файлы в редактируемые документы Word.",
  },
  "pdf-to-powerpoint": {
    title: "PDF в PowerPoint",
    description: "Конвертируйте PDF-файлы в презентации PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF в Excel",
    description: "Конвертируйте PDF-файлы в таблицы Excel.",
  },
  "word-to-pdf": {
    title: "Word в PDF",
    description: "Конвертируйте документы Word в PDF-файлы.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint в PDF",
    description: "Конвертируйте презентации PowerPoint в PDF-файлы.",
  },
  "excel-to-pdf": {
    title: "Excel в PDF",
    description: "Конвертируйте таблицы Excel в PDF-файлы.",
  },
  "pdf-editor": {
    title: "Редактор PDF",
    description: "Добавляйте текст на страницы PDF и редактируйте документы.",
  },
  "pdf-to-jpg": {
    title: "PDF в JPG",
    description: "Конвертируйте страницы PDF в изображения JPG.",
  },
  "pdf-signer": {
    title: "Подписать PDF",
    description: "Добавляйте свою подпись в документы PDF.",
  },
  "pdf-watermark": {
    title: "Водяной знак PDF",
    description: "Добавляйте настраиваемый водяной знак на каждую страницу PDF.",
  },
  "pdf-rotator": {
    title: "Повернуть PDF",
    description: "Поворачивайте страницы PDF в правильную ориентацию.",
  },
  "html-to-pdf": {
    title: "HTML в PDF",
    description: "Конвертируйте HTML-содержимое в документ PDF.",
  },
  "pdf-unlocker": {
    title: "Разблокировать PDF",
    description:
      "Снимайте ограничения PDF с документов, которые вы вправе редактировать.",
  },
  "pdf-protector": {
    title: "Защитить PDF",
    description: "Добавляйте параметры защиты в документы PDF.",
  },
  "pdf-organizer": {
    title: "Организовать PDF",
    description: "Меняйте порядок, организуйте и объединяйте PDF-файлы.",
  },
  "pdf-to-pdfa": {
    title: "PDF в PDF/A",
    description: "Готовьте документы PDF к долгосрочному архивированию.",
  },
  "pdf-repair": {
    title: "Восстановить PDF",
    description: "Попробуйте восстановить PDF-файлы с небольшими структурными проблемами.",
  },
  "pdf-page-numbers": {
    title: "Добавить номера страниц PDF",
    description: "Добавляйте номера страниц в документы PDF.",
  },
  "scan-to-pdf": {
    title: "Сканирование в PDF",
    description: "Преобразуйте отсканированные изображения в документ PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Извлекайте текст для поиска из отсканированных PDF-документов.",
  },
  "pdf-comparer": {
    title: "Сравнить PDF",
    description: "Сравнивайте два PDF-документа и находите основные различия.",
  },
  "pdf-redactor": {
    title: "Замаскировать PDF",
    description: "Скрывайте конфиденциальную информацию в документах PDF.",
  },
  "pdf-cropper": {
    title: "Обрезать PDF",
    description: "Обрезайте страницы PDF и удаляйте нежелательные поля.",
  },
  "pdf-forms": {
    title: "Формы PDF",
    description: "Заполняйте поля форм PDF и добавляйте информацию в документы.",
  },
  "pdf-summarizer": {
    title: "Суммаризатор PDF",
    description: "Составляйте краткое содержание PDF и понимайте ключевой контент.",
  },
  "pdf-translator": {
    title: "Переводчик PDF",
    description: "Переводите документы PDF на предпочитаемый язык.",
  },
  "pdf-to-markdown": {
    title: "PDF в Markdown",
    description: "Конвертируйте документы PDF в файлы Markdown.",
  },
  "social-qr-card": {
    title: "QR-карта для соцсетей",
    description:
      "Создайте один QR-код для WhatsApp, Instagram, Facebook, X, YouTube и других соцсетей.",
  },
  "video-to-link": {
    title: "Видео → ссылка",
    description: "Загрузите видео и создайте ссылку для отправки со сроком действия.",
  },
  "bulk-sms": {
    title: "Массовые SMS",
    description:
      "Персонализируйте SMS для каждого контакта, проверьте номера телефонов и скопируйте или экспортируйте список.",
  },
  "bulk-email": {
    title: "Массовые письма",
    description:
      "Персонализируйте письмо для каждого контакта, проверьте адреса электронной почты и скопируйте или экспортируйте список.",
  },
  "audio-to-text": {
    title: "Аудио в текст",
    description:
      "Преобразуйте аудиозаписи в редактируемый текст с приватной транскрипцией в браузере. Аудиофайл никуда не загружается.",
  },
};

const toolTextKo: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "배송 라벨 및 송장 PDF",
    description:
      "모든 PDF의 배송 라벨과 송장을 정확한 4×6, 100×150mm 또는 사용자 지정 인수 페이지에 맞춰 있습니다. 둘기 없음, 잘리 없음.",
  },
  compressor: {
    title: "이미지 압축기",
    description: "뛰어난 품질을 유지하면서 이미지 파일 크기를 줄입니다.",
  },
  "favicon-generator": {
    title: "파비콘 생성기",
    description:
      "PNG, JPG, WebP 또는 SVG 파일에서 여러 크기의 파비콘 이미지를 만듭니다.",
  },
  "qr-code-generator": {
    title: "QR 코드 생성기",
    description: "URL, 텍스트 및 기타 정보로 QR 코드를 즉시 만듭니다.",
  },
  "unit-converter": {
    title: "단위 변환기",
    description:
      "간편한 온라인 변환기로 길이, 무게, 온도 단위를 즉시 변환합니다.",
  },
  "percentage-calculator": {
    title: "백분율 계산기",
    description: "어떤 숫자의 백분율이든 빠르고 쉽게 계산합니다.",
  },
  "case-converter": {
    title: "대소문자 변환기",
    description:
      "텍스트를 대문자, 소문자, 제목 형식 또는 문장 형식으로 즉시 변환합니다.",
  },
  "character-counter": {
    title: "문자 수 계산기",
    description: "문자, 공백, 단어, 문장 및 문단을 즉시 셉니다.",
  },
  "word-counter": {
    title: "단어 수 계산기",
    description: "단어, 문자, 문장, 문단 및 줄을 즉시 셉니다.",
  },
  "heic-to-jpg": {
    title: "HEIC를 JPG로",
    description: "HEIC 및 HEIF 이미지를 무료로 온라인에서 JPG로 변환합니다.",
  },
  "compress-image-to-kb": {
    title: "이미지를 KB로 압축",
    description:
      "이미지를 20KB, 50KB, 100KB, 200KB 또는 원하는 크기로 압축합니다.",
  },
  "image-to-text": {
    title: "이미지를 텍스트로",
    description:
      "브라우저 기반 OCR로 JPG, PNG, WebP 및 기타 이미지에서 텍스트를 추출합니다.",
  },
  converter: {
    title: "이미지 변환기",
    description: "JPG, PNG, WebP 및 기타 인기 있는 이미지 형식을 변환합니다.",
  },
  resizer: {
    title: "이미지 크기 조정",
    description: "이미지를 몇 초 만에 정확한 크기로 조정합니다.",
  },
  cropper: {
    title: "이미지 자르기",
    description: "정확한 크기로 이미지를 빠르게 자릅니다.",
  },
  "image-to-pdf": {
    title: "이미지를 PDF로",
    description: "하나 또는 여러 이미지를 PDF 문서로 변환합니다.",
  },
  "webp-converter": {
    title: "WebP 변환기",
    description: "이미지를 빠르고 효율적인 WebP 형식으로 변환합니다.",
  },
  rotator: {
    title: "이미지 회전",
    description: "이미지를 쉽게 회전하고 똑바로 정렬합니다.",
  },
  enhancer: {
    title: "이미지 개선",
    description: "이미지의 선명도와 시각적 품질을 향상시킵니다.",
  },
  "background-remover": {
    title: "배경 제거",
    description: "이미지 배경을 제거하고 전문적인 색상으로 교체합니다.",
  },
  "image-metadata": {
    title: "이미지 메타데이터 도구",
    description:
      "이미지 메타데이터를 보고, EXIF 정보를 확인하고, 메타데이터를 제거한 후 깨끗한 이미지를 다운로드합니다.",
  },
  "passport-photo": {
    title: "여권 사진",
    description: "표준 여권 크기 사진과 인쇄 가능한 사진 시트를 만듭니다.",
  },
  "batch-converter": {
    title: "일괄 변환기",
    description: "여러 이미지를 하나의 워크플로에서 함께 처리합니다.",
  },
  "image-to-word": {
    title: "이미지를 Word로",
    description: "하나 또는 여러 이미지를 Word 문서로 변환합니다.",
  },
  "word-to-image": {
    title: "Word를 이미지로",
    description: "Word 문서를 이미지로 빠르게 변환합니다.",
  },
  "pdf-merger": {
    title: "PDF 병합",
    description: "여러 PDF 파일을 하나의 문서로 결합합니다.",
  },
  "pdf-splitter": {
    title: "PDF 분할",
    description: "PDF를 빠르고 쉽게 별도의 문서로 분할합니다.",
  },
  "pdf-compressor": {
    title: "PDF 압축",
    description: "문서를 사용하기 편하게 유지하면서 PDF 파일 크기를 줄입니다.",
  },
  "pdf-to-word": {
    title: "PDF를 Word로",
    description: "PDF 파일을 편집 가능한 Word 문서로 변환합니다.",
  },
  "pdf-to-powerpoint": {
    title: "PDF를 PowerPoint로",
    description: "PDF 파일을 PowerPoint 프레젠테이션으로 변환합니다.",
  },
  "pdf-to-excel": {
    title: "PDF를 Excel로",
    description: "PDF 파일을 Excel 스프레드시트로 변환합니다.",
  },
  "word-to-pdf": {
    title: "Word를 PDF로",
    description: "Word 문서를 PDF 파일로 변환합니다.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint를 PDF로",
    description: "PowerPoint 프레젠테이션을 PDF 파일로 변환합니다.",
  },
  "excel-to-pdf": {
    title: "Excel을 PDF로",
    description: "Excel 스프레드시트를 PDF 파일로 변환합니다.",
  },
  "pdf-editor": {
    title: "PDF 편집기",
    description: "PDF 페이지에 텍스트를 추가하고 문서를 편집합니다.",
  },
  "pdf-to-jpg": {
    title: "PDF를 JPG로",
    description: "PDF 페이지를 JPG 이미지로 변환합니다.",
  },
  "pdf-signer": {
    title: "PDF 서명",
    description: "PDF 문서에 서명을 추가합니다.",
  },
  "pdf-watermark": {
    title: "PDF 워터마크",
    description: "PDF의 모든 페이지에 사용자 지정 워터마크를 추가합니다.",
  },
  "pdf-rotator": {
    title: "PDF 회전",
    description: "PDF 페이지를 올바른 방향으로 회전합니다.",
  },
  "html-to-pdf": {
    title: "HTML을 PDF로",
    description: "HTML 콘텐츠를 PDF 문서로 변환합니다.",
  },
  "pdf-unlocker": {
    title: "PDF 잠금 해제",
    description: "편집 권한이 있는 문서에서 PDF 제한을 제거합니다.",
  },
  "pdf-protector": {
    title: "PDF 보호",
    description: "PDF 문서에 보호 설정을 추가합니다.",
  },
  "pdf-organizer": {
    title: "PDF 정리",
    description: "PDF 파일의 순서를 바꾸고 정리하고 결합합니다.",
  },
  "pdf-to-pdfa": {
    title: "PDF를 PDF/A로",
    description: "PDF 문서를 장기 보관용으로 준비합니다.",
  },
  "pdf-repair": {
    title: "PDF 복구",
    description: "사소한 구조 문제가 있는 PDF 파일을 복구해 봅니다.",
  },
  "pdf-page-numbers": {
    title: "PDF 페이지 번호 추가",
    description: "PDF 문서에 페이지 번호를 추가합니다.",
  },
  "scan-to-pdf": {
    title: "스캔을 PDF로",
    description: "스캔한 이미지를 PDF 문서로 변환합니다.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "스캔한 PDF 문서에서 검색 가능한 텍스트를 추출합니다.",
  },
  "pdf-comparer": {
    title: "PDF 비교",
    description: "두 PDF 문서를 비교하고 기본적인 차이를 확인합니다.",
  },
  "pdf-redactor": {
    title: "PDF 가리기",
    description: "PDF 문서의 민감한 정보를 숨깁니다.",
  },
  "pdf-cropper": {
    title: "PDF 자르기",
    description: "PDF 페이지를 자르고 원치 않는 여백을 제거합니다.",
  },
  "pdf-forms": {
    title: "PDF 양식",
    description: "PDF 양식 필드를 작성하고 문서에 정보를 추가합니다.",
  },
  "pdf-summarizer": {
    title: "PDF 요약",
    description: "PDF 문서를 요약하고 핵심 내용을 파악합니다.",
  },
  "pdf-translator": {
    title: "PDF 번역기",
    description: "PDF 문서를 원하는 언어로 번역합니다.",
  },
  "pdf-to-markdown": {
    title: "PDF를 Markdown으로",
    description: "PDF 문서를 Markdown 파일로 변환합니다.",
  },
  "social-qr-card": {
    title: "소셜 미디어 QR 카드",
    description:
      "WhatsApp, Instagram, Facebook, X, YouTube 및 기타 소셜 링크를 위한 하나의 QR 코드를 만듭니다.",
  },
  "video-to-link": {
    title: "동영상 → 링크",
    description: "동영상을 업로드하고 만료 시간이 있는 공유 링크를 만듭니다.",
  },
  "bulk-sms": {
    title: "대량 SMS 작성",
    description:
      "연락처별로 SMS 메시지를 개인화하고 전화번호를 검증한 뒤 목록을 복사하거나 내보냅니다.",
  },
  "bulk-email": {
    title: "대량 이메일 작성",
    description:
      "연락처별로 이메일을 개인화하고 이메일 주소를 검증한 뒤 목록을 복사하거나 내보냅니다.",
  },
  "audio-to-text": {
    title: "오디오 텍스트 변환",
    description:
      "브라우저에서 오디오를 편집 가능한 텍스트로 변환합니다. 오디오 파일은 업로드되지 않습니다.",
  },
};

const toolTextZhCn: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "快递标签与发票 PDF",
    description:
      "将任意 PDF 中的快递标签和发票精确排入 4×6、100×150 毫米或自定义打印页面，不变形、不裁切。",
  },
  compressor: {
    title: "图片压缩器",
    description: "在保持出色质量的同时缩小图片文件大小。",
  },
  "favicon-generator": {
    title: "Favicon 生成器",
    description: "从 PNG、JPG、WebP 或 SVG 文件生成多种尺寸的 favicon 图片。",
  },
  "qr-code-generator": {
    title: "二维码生成器",
    description: "使用网址、文本及其他信息即时生成二维码。",
  },
  "unit-converter": {
    title: "单位换算器",
    description: "使用简单的在线换算器即时换算长度、重量和温度单位。",
  },
  "percentage-calculator": {
    title: "百分比计算器",
    description: "快速轻松地计算任意数值的百分比。",
  },
  "case-converter": {
    title: "大小写转换器",
    description: "即时将文本转换为大写、小写、标题格式或句子格式。",
  },
  "character-counter": {
    title: "字符计数器",
    description: "即时统计字符、空格、单词、句子和段落。",
  },
  "word-counter": {
    title: "字数统计器",
    description: "即时统计单词、字符、句子、段落和行数。",
  },
  "heic-to-jpg": {
    title: "HEIC 转 JPG",
    description: "免费在线将 HEIC 和 HEIF 图片转换为 JPG。",
  },
  "compress-image-to-kb": {
    title: "将图片压缩到 KB",
    description: "将图片压缩到 20KB、50KB、100KB、200KB 或自定义大小。",
  },
  "image-to-text": {
    title: "图片转文字",
    description: "通过浏览器端 OCR 从 JPG、PNG、WebP 及其他图片中提取文字。",
  },
  converter: {
    title: "图片转换器",
    description: "转换 JPG、PNG、WebP 及其他常用图片格式。",
  },
  resizer: {
    title: "图片尺寸调整器",
    description: "几秒钟内将图片调整为精确尺寸。",
  },
  cropper: {
    title: "图片裁剪器",
    description: "以精确尺寸快速裁剪图片。",
  },
  "image-to-pdf": {
    title: "图片转 PDF",
    description: "将一张或多张图片转换为 PDF 文档。",
  },
  "webp-converter": {
    title: "WebP 转换器",
    description: "将图片转换为快速高效的 WebP 格式。",
  },
  rotator: {
    title: "图片旋转器",
    description: "轻松旋转并校正图片。",
  },
  enhancer: {
    title: "图片增强器",
    description: "提升图片的清晰度和视觉质量。",
  },
  "background-remover": {
    title: "背景移除器",
    description: "移除图片背景，并替换为专业的颜色。",
  },
  "image-metadata": {
    title: "图片元数据工具",
    description: "查看图片元数据、检查 EXIF 信息、移除元数据并下载干净的图片。",
  },
  "passport-photo": {
    title: "护照照片",
    description: "制作标准护照尺寸照片和可打印的照片排版。",
  },
  "batch-converter": {
    title: "批量转换器",
    description: "在一个工作流程中处理多张图片。",
  },
  "image-to-word": {
    title: "图片转 Word",
    description: "将一张或多张图片转换为 Word 文档。",
  },
  "word-to-image": {
    title: "Word 转图片",
    description: "快速将 Word 文档转换为图片。",
  },
  "pdf-merger": {
    title: "合并 PDF",
    description: "将多个 PDF 文件合并为一个文档。",
  },
  "pdf-splitter": {
    title: "拆分 PDF",
    description: "快速轻松地将 PDF 拆分为多个文档。",
  },
  "pdf-compressor": {
    title: "压缩 PDF",
    description: "在保持文档易于使用的同时缩小 PDF 文件大小。",
  },
  "pdf-to-word": {
    title: "PDF 转 Word",
    description: "将 PDF 文件转换为可编辑的 Word 文档。",
  },
  "pdf-to-powerpoint": {
    title: "PDF 转 PowerPoint",
    description: "将 PDF 文件转换为 PowerPoint 演示文稿。",
  },
  "pdf-to-excel": {
    title: "PDF 转 Excel",
    description: "将 PDF 文件转换为 Excel 电子表格。",
  },
  "word-to-pdf": {
    title: "Word 转 PDF",
    description: "将 Word 文档转换为 PDF 文件。",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint 转 PDF",
    description: "将 PowerPoint 演示文稿转换为 PDF 文件。",
  },
  "excel-to-pdf": {
    title: "Excel 转 PDF",
    description: "将 Excel 电子表格转换为 PDF 文件。",
  },
  "pdf-editor": {
    title: "PDF 编辑器",
    description: "在 PDF 页面中添加文字并编辑文档。",
  },
  "pdf-to-jpg": {
    title: "PDF 转 JPG",
    description: "将 PDF 页面转换为 JPG 图片。",
  },
  "pdf-signer": {
    title: "签署 PDF",
    description: "在 PDF 文档中添加您的签名。",
  },
  "pdf-watermark": {
    title: "PDF 水印",
    description: "为 PDF 的每一页添加自定义水印。",
  },
  "pdf-rotator": {
    title: "旋转 PDF",
    description: "将 PDF 页面旋转到正确的方向。",
  },
  "html-to-pdf": {
    title: "HTML 转 PDF",
    description: "将 HTML 内容转换为 PDF 文档。",
  },
  "pdf-unlocker": {
    title: "解锁 PDF",
    description: "移除您有权编辑的文档中的 PDF 限制。",
  },
  "pdf-protector": {
    title: "保护 PDF",
    description: "为您的 PDF 文档添加保护设置。",
  },
  "pdf-organizer": {
    title: "整理 PDF",
    description: "重新排序、整理并合并 PDF 文件。",
  },
  "pdf-to-pdfa": {
    title: "PDF 转 PDF/A",
    description: "为 PDF 文档做好长期归档准备。",
  },
  "pdf-repair": {
    title: "修复 PDF",
    description: "尝试修复存在轻微结构问题的 PDF 文件。",
  },
  "pdf-page-numbers": {
    title: "添加 PDF 页码",
    description: "为您的 PDF 文档添加页码。",
  },
  "scan-to-pdf": {
    title: "扫描转 PDF",
    description: "将扫描的图片转换为 PDF 文档。",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "从扫描的 PDF 文档中提取可搜索文字。",
  },
  "pdf-comparer": {
    title: "比较 PDF",
    description: "比较两个 PDF 文档并找出基本差异。",
  },
  "pdf-redactor": {
    title: "遮盖 PDF",
    description: "隐藏 PDF 文档中的敏感信息。",
  },
  "pdf-cropper": {
    title: "裁剪 PDF",
    description: "裁剪 PDF 页面并移除不需要的边距。",
  },
  "pdf-forms": {
    title: "PDF 表单",
    description: "填写 PDF 表单字段并向文档添加信息。",
  },
  "pdf-summarizer": {
    title: "PDF 摘要器",
    description: "总结 PDF 文档并理解关键内容。",
  },
  "pdf-translator": {
    title: "PDF 翻译器",
    description: "将 PDF 文档翻译成您首选的语言。",
  },
  "pdf-to-markdown": {
    title: "PDF 转 Markdown",
    description: "将 PDF 文档转换为 Markdown 文件。",
  },
  "social-qr-card": {
    title: "社交媒体二维码卡片",
    description:
      "为 WhatsApp、Instagram、Facebook、X、YouTube 及其他社交链接生成一个二维码。",
  },
  "video-to-link": {
    title: "视频 → 链接",
    description: "上传视频并创建带有有效期的可分享链接。",
  },
  "bulk-sms": {
    title: "批量短信",
    description:
      "为每个联系人生成个性化短信，校验手机号码，并可复制或导出列表。",
  },
  "bulk-email": {
    title: "批量邮件",
    description:
      "为每个联系人生成个性化邮件，校验电子邮箱地址，并可复制或导出列表。",
  },
  "audio-to-text": {
    title: "音频转文字",
    description:
      "在浏览器中将录音转为可编辑的文本。音频文件不会被上传。",
  },
};

const toolTextZhTw: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "物流標籤與發票 PDF",
    description:
      "將任何 PDF 中的物流標籤與發票精確置於 4×6、100×150 公簭或自訂列印頁面，不縮放變形、不裁切。",
  },
  compressor: {
    title: "圖片壓縮器",
    description: "在維持優異品質的同時縮小圖片檔案大小。",
  },
  "favicon-generator": {
    title: "Favicon 產生器",
    description: "從 PNG、JPG、WebP 或 SVG 檔案產生多種尺寸的 favicon 圖片。",
  },
  "qr-code-generator": {
    title: "QR 碼產生器",
    description: "使用網址、文字及其他資訊立即產生 QR 碼。",
  },
  "unit-converter": {
    title: "單位換算器",
    description: "使用簡單的線上換算器立即換算長度、重量與溫度單位。",
  },
  "percentage-calculator": {
    title: "百分比計算器",
    description: "快速輕鬆地計算任何數值的百分比。",
  },
  "case-converter": {
    title: "大小寫轉換器",
    description: "立即將文字轉換為大寫、小寫、標題格式或句子格式。",
  },
  "character-counter": {
    title: "字元計數器",
    description: "立即計算字元、空格、單字、句子與段落。",
  },
  "word-counter": {
    title: "字數統計器",
    description: "立即計算單字、字元、句子、段落與行數。",
  },
  "heic-to-jpg": {
    title: "HEIC 轉 JPG",
    description: "免費在線上將 HEIC 與 HEIF 圖片轉換為 JPG。",
  },
  "compress-image-to-kb": {
    title: "將圖片壓縮到 KB",
    description: "將圖片壓縮到 20KB、50KB、100KB、200KB 或自訂大小。",
  },
  "image-to-text": {
    title: "圖片轉文字",
    description: "透過瀏覽器端 OCR 從 JPG、PNG、WebP 及其他圖片擷取文字。",
  },
  converter: {
    title: "圖片轉換器",
    description: "轉換 JPG、PNG、WebP 及其他常用圖片格式。",
  },
  resizer: {
    title: "圖片尺寸調整器",
    description: "在幾秒內將圖片調整為精確尺寸。",
  },
  cropper: {
    title: "圖片裁剪器",
    description: "以精確尺寸快速裁剪圖片。",
  },
  "image-to-pdf": {
    title: "圖片轉 PDF",
    description: "將一張或多張圖片轉換為 PDF 文件。",
  },
  "webp-converter": {
    title: "WebP 轉換器",
    description: "將圖片轉換為快速高效的 WebP 格式。",
  },
  rotator: {
    title: "圖片旋轉器",
    description: "輕鬆旋轉並校正圖片。",
  },
  enhancer: {
    title: "圖片增強器",
    description: "提升圖片的清晰度與視覺品質。",
  },
  "background-remover": {
    title: "背景移除器",
    description: "移除圖片背景，並替換為專業的色彩。",
  },
  "image-metadata": {
    title: "圖片中繼資料工具",
    description:
      "檢視圖片中繼資料、檢查 EXIF 資訊、移除中繼資料並下載乾淨的圖片。",
  },
  "passport-photo": {
    title: "護照照片",
    description: "製作標準護照尺寸照片與可列印的照片排版。",
  },
  "batch-converter": {
    title: "批次轉換器",
    description: "在單一工作流程中處理多張圖片。",
  },
  "image-to-word": {
    title: "圖片轉 Word",
    description: "將一張或多張圖片轉換為 Word 文件。",
  },
  "word-to-image": {
    title: "Word 轉圖片",
    description: "快速將 Word 文件轉換為圖片。",
  },
  "pdf-merger": {
    title: "合併 PDF",
    description: "將多個 PDF 檔案合併為單一文件。",
  },
  "pdf-splitter": {
    title: "拆分 PDF",
    description: "快速輕鬆地將 PDF 拆分為個別文件。",
  },
  "pdf-compressor": {
    title: "壓縮 PDF",
    description: "在維持文件易於使用的同時縮小 PDF 檔案大小。",
  },
  "pdf-to-word": {
    title: "PDF 轉 Word",
    description: "將 PDF 檔案轉換為可編輯的 Word 文件。",
  },
  "pdf-to-powerpoint": {
    title: "PDF 轉 PowerPoint",
    description: "將 PDF 檔案轉換為 PowerPoint 簡報。",
  },
  "pdf-to-excel": {
    title: "PDF 轉 Excel",
    description: "將 PDF 檔案轉換為 Excel 試算表。",
  },
  "word-to-pdf": {
    title: "Word 轉 PDF",
    description: "將 Word 文件轉換為 PDF 檔案。",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint 轉 PDF",
    description: "將 PowerPoint 簡報轉換為 PDF 檔案。",
  },
  "excel-to-pdf": {
    title: "Excel 轉 PDF",
    description: "將 Excel 試算表轉換為 PDF 檔案。",
  },
  "pdf-editor": {
    title: "PDF 編輯器",
    description: "在 PDF 頁面中新增文字並編輯文件。",
  },
  "pdf-to-jpg": {
    title: "PDF 轉 JPG",
    description: "將 PDF 頁面轉換為 JPG 圖片。",
  },
  "pdf-signer": {
    title: "簽署 PDF",
    description: "在 PDF 文件中新增您的簽名。",
  },
  "pdf-watermark": {
    title: "PDF 浮水印",
    description: "為 PDF 的每一頁新增自訂浮水印。",
  },
  "pdf-rotator": {
    title: "旋轉 PDF",
    description: "將 PDF 頁面旋轉到正確的方向。",
  },
  "html-to-pdf": {
    title: "HTML 轉 PDF",
    description: "將 HTML 內容轉換為 PDF 文件。",
  },
  "pdf-unlocker": {
    title: "解鎖 PDF",
    description: "移除您有權編輯之文件中的 PDF 限制。",
  },
  "pdf-protector": {
    title: "保護 PDF",
    description: "為您的 PDF 文件新增保護設定。",
  },
  "pdf-organizer": {
    title: "整理 PDF",
    description: "重新排序、整理並合併 PDF 檔案。",
  },
  "pdf-to-pdfa": {
    title: "PDF 轉 PDF/A",
    description: "為 PDF 文件做好長期封存準備。",
  },
  "pdf-repair": {
    title: "修復 PDF",
    description: "嘗試修復有輕微結構問題的 PDF 檔案。",
  },
  "pdf-page-numbers": {
    title: "新增 PDF 頁碼",
    description: "為您的 PDF 文件新增頁碼。",
  },
  "scan-to-pdf": {
    title: "掃描轉 PDF",
    description: "將掃描的圖片轉換為 PDF 文件。",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "從掃描的 PDF 文件中擷取可搜尋的文字。",
  },
  "pdf-comparer": {
    title: "比較 PDF",
    description: "比較兩份 PDF 文件並找出基本差異。",
  },
  "pdf-redactor": {
    title: "遮蓋 PDF",
    description: "隱藏 PDF 文件中的敏感資訊。",
  },
  "pdf-cropper": {
    title: "裁剪 PDF",
    description: "裁剪 PDF 頁面並移除不需要的邊界。",
  },
  "pdf-forms": {
    title: "PDF 表單",
    description: "填寫 PDF 表單欄位並新增資訊至文件。",
  },
  "pdf-summarizer": {
    title: "PDF 摘要器",
    description: "摘要 PDF 文件並掌握關鍵內容。",
  },
  "pdf-translator": {
    title: "PDF 翻譯器",
    description: "將 PDF 文件翻譯成您偏好的語言。",
  },
  "pdf-to-markdown": {
    title: "PDF 轉 Markdown",
    description: "將 PDF 文件轉換為 Markdown 檔案。",
  },
  "social-qr-card": {
    title: "社群媒體 QR 卡片",
    description:
      "為 WhatsApp、Instagram、Facebook、X、YouTube 及其他社群連結產生一個 QR 碼。",
  },
  "video-to-link": {
    title: "影片 → 連結",
    description: "上傳影片並建立附有到期時間的可分享連結。",
  },
  "bulk-sms": {
    title: "批量簡訊",
    description:
      "為每個聯絡人產生個人化簡訊、驗證電話號碼，並可複製或匯出清單。",
  },
  "bulk-email": {
    title: "批量郵件",
    description:
      "為每個聯絡人產生個人化郵件、驗證電子郵件地址，並可複製或匯出清單。",
  },
  "audio-to-text": {
    title: "音訊轉文字",
    description:
      "在瀏覽器中將錄音轉為可編輯的文字。音訊檔案不會被上傳。",
  },
};

const toolTextAr: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "ملصق الشحن وفاتورة PDF",
    description:
      "ضط ملصقات الشحن والفاتور منأي PDF على صفحات طباعة دقيقة 4×6 و 100×150 مم أو مسخارة بدون تمدد أو قص.",
  },
  compressor: {
    title: "ضاغط الصور",
    description: "قلّل حجم ملف الصورة مع الحفاظ على جودة ممتازة.",
  },
  "favicon-generator": {
    title: "مولّد الأيقونات المفضلة",
    description:
      "أنشئ صور الأيقونات المفضلة بأحجام متعددة من ملفات PNG أو JPG أو WebP أو SVG.",
  },
  "qr-code-generator": {
    title: "مولّد رموز QR",
    description: "أنشئ رموز QR من الروابط والنصوص والمعلومات الأخرى فورًا.",
  },
  "unit-converter": {
    title: "محوّل الوحدات",
    description:
      "حوّل وحدات الطول والوزن ودرجة الحرارة فورًا باستخدام محوّل بسيط عبر الإنترنت.",
  },
  "percentage-calculator": {
    title: "حاسبة النسبة المئوية",
    description: "احسب النسبة المئوية لأي رقم بسرعة وسهولة.",
  },
  "case-converter": {
    title: "محوّل حالة الأحرف",
    description:
      "حوّل النص إلى أحرف كبيرة أو صغيرة أو حالة العنوان أو الجملة فورًا.",
  },
  "character-counter": {
    title: "عدّاد الأحرف",
    description: "احسب الأحرف والمسافات والكلمات والجمل والفقرات فورًا.",
  },
  "word-counter": {
    title: "عدّاد الكلمات",
    description: "احسب الكلمات والأحرف والجمل والفقرات والأسطر فورًا.",
  },
  "heic-to-jpg": {
    title: "HEIC إلى JPG",
    description: "حوّل صور HEIC و HEIF إلى JPG مجانًا عبر الإنترنت.",
  },
  "compress-image-to-kb": {
    title: "ضغط الصورة إلى KB",
    description: "اضغط الصور إلى 20KB أو 50KB أو 100KB أو 200KB أو حجم مخصص.",
  },
  "image-to-text": {
    title: "الصورة إلى نص",
    description:
      "استخرج النص من صور JPG و PNG و WebP وغيرها باستخدام OCR في المتصفح.",
  },
  converter: {
    title: "محوّل الصور",
    description: "حوّل صيغ الصور الشائعة JPG و PNG و WebP وغيرها.",
  },
  resizer: {
    title: "تغيير حجم الصور",
    description: "غيّر حجم صورك إلى الأبعاد الدقيقة في ثوانٍ.",
  },
  cropper: {
    title: "قصّ الصور",
    description: "اقتطع صورك بسرعة بأبعاد دقيقة.",
  },
  "image-to-pdf": {
    title: "الصورة إلى PDF",
    description: "حوّل صورة واحدة أو عدة صور إلى مستند PDF.",
  },
  "webp-converter": {
    title: "محوّل WebP",
    description: "حوّل الصور إلى صيغة WebP السريعة والفعّالة.",
  },
  rotator: {
    title: "تدوير الصور",
    description: "دوّر صورك واجعلها مستقيمة بسهولة.",
  },
  enhancer: {
    title: "تحسين الصور",
    description: "حسّن وضوح الصورة وجودتها البصرية.",
  },
  "background-remover": {
    title: "إزالة الخلفية",
    description: "أزل خلفية الصور واستبدلها بألوان احترافية.",
  },
  "image-metadata": {
    title: "أداة بيانات الصورة الوصفية",
    description:
      "اعرض بيانات الصورة الوصفية، وافحص معلومات EXIF، وأزل البيانات الوصفية، ونزّل صورة نظيفة.",
  },
  "passport-photo": {
    title: "صورة بحجم جواز السفر",
    description:
      "أنشئ صورًا بحجم جواز السفر القياسي وأوراق صور قابلة للطباعة.",
  },
  "batch-converter": {
    title: "محوّل دفعي",
    description: "عالج عدة صور معًا في سير عمل واحد.",
  },
  "image-to-word": {
    title: "الصورة إلى Word",
    description: "حوّل صورة واحدة أو عدة صور إلى مستند Word.",
  },
  "word-to-image": {
    title: "Word إلى صورة",
    description: "حوّل مستند Word إلى صورة بسرعة.",
  },
  "pdf-merger": {
    title: "دمج PDF",
    description: "اجمع عدة ملفات PDF في مستند واحد.",
  },
  "pdf-splitter": {
    title: "تقسيم PDF",
    description: "قسّم ملف PDF إلى مستندات منفصلة بسرعة وسهولة.",
  },
  "pdf-compressor": {
    title: "ضغط PDF",
    description: "قلّل حجم ملف PDF مع الحفاظ على سهولة استخدام مستنداتك.",
  },
  "pdf-to-word": {
    title: "PDF إلى Word",
    description: "حوّل ملفات PDF إلى مستندات Word قابلة للتحرير.",
  },
  "pdf-to-powerpoint": {
    title: "PDF إلى PowerPoint",
    description: "حوّل ملفات PDF إلى عروض PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF إلى Excel",
    description: "حوّل ملفات PDF إلى جداول Excel.",
  },
  "word-to-pdf": {
    title: "Word إلى PDF",
    description: "حوّل مستندات Word إلى ملفات PDF.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint إلى PDF",
    description: "حوّل عروض PowerPoint إلى ملفات PDF.",
  },
  "excel-to-pdf": {
    title: "Excel إلى PDF",
    description: "حوّل جداول Excel إلى ملفات PDF.",
  },
  "pdf-editor": {
    title: "محرّر PDF",
    description: "أضف نصًا إلى صفحات PDF وحرّر مستنداتك.",
  },
  "pdf-to-jpg": {
    title: "PDF إلى JPG",
    description: "حوّل صفحات PDF إلى صور JPG.",
  },
  "pdf-signer": {
    title: "توقيع PDF",
    description: "أضف توقيعك إلى مستندات PDF.",
  },
  "pdf-watermark": {
    title: "علامة مائية PDF",
    description: "أضف علامة مائية مخصصة إلى كل صفحة في ملف PDF.",
  },
  "pdf-rotator": {
    title: "تدوير PDF",
    description: "دوّر صفحات PDF إلى الاتجاه الصحيح.",
  },
  "html-to-pdf": {
    title: "HTML إلى PDF",
    description: "حوّل محتوى HTML إلى مستند PDF.",
  },
  "pdf-unlocker": {
    title: "فتح قفل PDF",
    description: "أزل قيود PDF من المستندات المسموح لك بتحريرها.",
  },
  "pdf-protector": {
    title: "حماية PDF",
    description: "أضف إعدادات الحماية إلى مستندات PDF.",
  },
  "pdf-organizer": {
    title: "تنظيم PDF",
    description: "أعد ترتيب ملفات PDF ونظّمها ودمجها.",
  },
  "pdf-to-pdfa": {
    title: "PDF إلى PDF/A",
    description: "جهّز مستندات PDF للأرشفة طويلة المدى.",
  },
  "pdf-repair": {
    title: "إصلاح PDF",
    description: "حاول إصلاح ملفات PDF ذات المشكلات الهيكلية الطفيفة.",
  },
  "pdf-page-numbers": {
    title: "إضافة أرقام صفحات PDF",
    description: "أضف أرقام صفحات إلى مستندات PDF.",
  },
  "scan-to-pdf": {
    title: "المسح إلى PDF",
    description: "حوّل الصور الممسوحة ضوئيًا إلى مستند PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "استخرج نصًا قابلًا للبحث من مستندات PDF الممسوحة ضوئيًا.",
  },
  "pdf-comparer": {
    title: "مقارنة PDF",
    description: "قارن مستندي PDF وحدّد الاختلافات الأساسية.",
  },
  "pdf-redactor": {
    title: "حجب PDF",
    description: "أخفِ المعلومات الحساسة في مستندات PDF.",
  },
  "pdf-cropper": {
    title: "قصّ PDF",
    description: "اقتطع صفحات PDF وأزل الهوامش غير المرغوب فيها.",
  },
  "pdf-forms": {
    title: "نماذج PDF",
    description: "املأ حقول نماذج PDF وأضف معلومات إلى المستندات.",
  },
  "pdf-summarizer": {
    title: "ملخّص PDF",
    description: "لخّص مستندات PDF وافهم المحتوى الأساسي.",
  },
  "pdf-translator": {
    title: "مترجم PDF",
    description: "ترجم مستندات PDF إلى لغتك المفضلة.",
  },
  "pdf-to-markdown": {
    title: "PDF إلى Markdown",
    description: "حوّل مستندات PDF إلى ملفات Markdown.",
  },
  "social-qr-card": {
    title: "بطاقة QR لوسائل التواصل",
    description:
      "أنشئ رمز QR واحدًا لروابط WhatsApp و Instagram و Facebook و X و YouTube وغيرها.",
  },
  "video-to-link": {
    title: "فيديو → رابط",
    description: "ارفع فيديو وأنشئ رابطًا قابلاً للمشاركة مع وقت انتهاء.",
  },
  "bulk-sms": {
    title: "رسائل SMS جماعية",
    description:
      "خصّص رسالة SMS واحدة لكل جهة اتصال، وتحقّق من أرقام الهاتف، ثم انسخ القائمة أو صدّرها.",
  },
  "bulk-email": {
    title: "رسائل بريد إلكتروني جماعية",
    description:
      "خصّص رسالة بريد إلكترونية واحدة لكل جهة اتصال، وتحقّق من عناوين البريد، ثم انسخ القائمة أو صدّرها.",
  },
  "audio-to-text": {
    title: "من الصوت إلى النص",
    description:
      "حوّل تسجيلات الصوت إلى نص قابل للتعديل بتفريغ جلسي خاص داخل المتصفح. لا يتم رفع ملف الصوت إلى أي خادم.",
  },
};

const toolTextBg: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Транспортен етикет и фактура PDF",
    description:
      "Поставяйте етикети и фактури от всякъв PDF в точни страници 4×6, 100×150 мм или по избор, без разтягане и изрязване.",
  },
  compressor: {
    title: "Компресор за изображения",
    description: "Намалете размера на файла с изображение, като запазите отлично качество.",
  },
  "favicon-generator": {
    title: "Генератор на favicon",
    description:
      "Създавайте favicon изображения в различни размери от PNG, JPG, WebP или SVG файлове.",
  },
  "qr-code-generator": {
    title: "Генератор на QR кодове",
    description:
      "Създавайте QR кодове от URL адреси, текст и друга информация веднага.",
  },
  "unit-converter": {
    title: "Преобразувател на единици",
    description:
      "Преобразувайте единици за дължина, тегло и температура веднага с лесен онлайн преобразувател.",
  },
  "percentage-calculator": {
    title: "Калкулатор за проценти",
    description: "Изчислявайте процент от произволно число бързо и лесно.",
  },
  "case-converter": {
    title: "Преобразувател на регистър",
    description:
      "Преобразувайте текст в главни, малки букви, заглавие или изречение веднага.",
  },
  "character-counter": {
    title: "Брояч на символи",
    description:
      "Преброявайте символи, интервали, думи, изречения и абзаци веднага.",
  },
  "word-counter": {
    title: "Брояч на думи",
    description:
      "Преброявайте думи, символи, изречения, абзаци и редове веднага.",
  },
  "heic-to-jpg": {
    title: "HEIC към JPG",
    description: "Конвертирайте HEIC и HEIF изображения към JPG безплатно онлайн.",
  },
  "compress-image-to-kb": {
    title: "Компресиране на изображение до KB",
    description:
      "Компресирайте изображения до 20KB, 50KB, 100KB, 200KB или персонализиран размер.",
  },
  "image-to-text": {
    title: "Изображение към текст",
    description:
      "Извличайте текст от JPG, PNG, WebP и други изображения с OCR в браузъра.",
  },
  converter: {
    title: "Конвертор на изображения",
    description:
      "Конвертирайте JPG, PNG, WebP и други популярни формати за изображения.",
  },
  resizer: {
    title: "Промяна на размера на изображения",
    description: "Променяйте размера на изображенията до точни размери за секунди.",
  },
  cropper: {
    title: "Изрязване на изображения",
    description: "Изрязвайте изображенията бързо с точни размери.",
  },
  "image-to-pdf": {
    title: "Изображение към PDF",
    description: "Превърнете едно или няколко изображения в PDF документ.",
  },
  "webp-converter": {
    title: "WebP конвертор",
    description: "Конвертирайте изображения в бързия и ефективен WebP формат.",
  },
  rotator: {
    title: "Завъртане на изображения",
    description: "Завъртайте и изправяйте изображенията лесно.",
  },
  enhancer: {
    title: "Подобряване на изображения",
    description: "Подобрете яснотата и визуалното качество на изображението.",
  },
  "background-remover": {
    title: "Премахване на фон",
    description:
      "Премахнете фона на изображенията и го заменете с професионални цветове.",
  },
  "image-metadata": {
    title: "Инструмент за метаданни на изображение",
    description:
      "Преглеждайте метаданните, проверявайте EXIF информацията, премахвайте метаданните и изтегляйте чисто изображение.",
  },
  "passport-photo": {
    title: "Снимка с размер за паспорт",
    description:
      "Създавайте снимки със стандартен размер за паспорт и листове за печат.",
  },
  "batch-converter": {
    title: "Пакетен конвертор",
    description: "Обработвайте няколко изображения заедно в един работен процес.",
  },
  "image-to-word": {
    title: "Изображение към Word",
    description: "Конвертирайте едно или няколко изображения в Word документ.",
  },
  "word-to-image": {
    title: "Word към изображение",
    description: "Конвертирайте Word документа си в изображение бързо.",
  },
  "pdf-merger": {
    title: "Обединяване на PDF",
    description: "Обединете няколко PDF файла в един документ.",
  },
  "pdf-splitter": {
    title: "Разделяне на PDF",
    description: "Разделете PDF на отделни документи бързо и лесно.",
  },
  "pdf-compressor": {
    title: "Компресиране на PDF",
    description:
      "Намалете размера на PDF файла, като запазите документите удобни за използване.",
  },
  "pdf-to-word": {
    title: "PDF към Word",
    description: "Конвертирайте PDF файлове в редактируеми Word документи.",
  },
  "pdf-to-powerpoint": {
    title: "PDF към PowerPoint",
    description: "Конвертирайте PDF файлове в презентации PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF към Excel",
    description: "Конвертирайте PDF файлове в таблици Excel.",
  },
  "word-to-pdf": {
    title: "Word към PDF",
    description: "Конвертирайте Word документи в PDF файлове.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint към PDF",
    description: "Конвертирайте презентации PowerPoint в PDF файлове.",
  },
  "excel-to-pdf": {
    title: "Excel към PDF",
    description: "Конвертирайте таблици Excel в PDF файлове.",
  },
  "pdf-editor": {
    title: "Редактор на PDF",
    description: "Добавяйте текст към PDF страниците и редактирайте документите си.",
  },
  "pdf-to-jpg": {
    title: "PDF към JPG",
    description: "Конвертирайте PDF страниците в JPG изображения.",
  },
  "pdf-signer": {
    title: "Подписване на PDF",
    description: "Добавете подписа си към PDF документи.",
  },
  "pdf-watermark": {
    title: "Воден знак в PDF",
    description: "Добавете персонализиран воден знак към всяка страница от PDF.",
  },
  "pdf-rotator": {
    title: "Завъртане на PDF",
    description: "Завъртете PDF страниците в правилната ориентация.",
  },
  "html-to-pdf": {
    title: "HTML към PDF",
    description: "Конвертирайте HTML съдържание в PDF документ.",
  },
  "pdf-unlocker": {
    title: "Отключване на PDF",
    description:
      "Премахнете PDF ограниченията от документи, които имате право да редактирате.",
  },
  "pdf-protector": {
    title: "Защита на PDF",
    description: "Добавете настройки за защита към PDF документите си.",
  },
  "pdf-organizer": {
    title: "Организиране на PDF",
    description: "Пренаредете, организирайте и обединявайте PDF файлове.",
  },
  "pdf-to-pdfa": {
    title: "PDF към PDF/A",
    description: "Подгответе PDF документите за дългосрочно архивиране.",
  },
  "pdf-repair": {
    title: "Възстановяване на PDF",
    description: "Опитайте да възстановите PDF файлове с малки структурни проблеми.",
  },
  "pdf-page-numbers": {
    title: "Добавяне на номера на страници в PDF",
    description: "Добавете номера на страници към PDF документите си.",
  },
  "scan-to-pdf": {
    title: "Сканиране към PDF",
    description: "Конвертирайте сканирани изображения в PDF документ.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Извличайте търсим текст от сканирани PDF документи.",
  },
  "pdf-comparer": {
    title: "Сравняване на PDF",
    description: "Сравнете два PDF документа и открийте основните разлики.",
  },
  "pdf-redactor": {
    title: "Скриване в PDF",
    description: "Скрийте чувствителната информация в PDF документи.",
  },
  "pdf-cropper": {
    title: "Изрязване на PDF",
    description: "Изрежете PDF страниците и премахнете нежеланите полета.",
  },
  "pdf-forms": {
    title: "PDF формуляри",
    description:
      "Попълвайте полета на PDF формуляри и добавяйте информация към документи.",
  },
  "pdf-summarizer": {
    title: "Резюматор на PDF",
    description: "Обобщавайте PDF документи и разбирайте ключовото съдържание.",
  },
  "pdf-translator": {
    title: "Преводач на PDF",
    description: "Превеждайте PDF документи на предпочитания от вас език.",
  },
  "pdf-to-markdown": {
    title: "PDF към Markdown",
    description: "Конвертирайте PDF документи в Markdown файлове.",
  },
  "social-qr-card": {
    title: "QR карта за социални мрежи",
    description:
      "Създайте един QR код за WhatsApp, Instagram, Facebook, X, YouTube и други социални връзки.",
  },
  "video-to-link": {
    title: "Видео → връзка",
    description: "Качете видео и създайте връзка за споделяне със срок на валидност.",
  },
  "bulk-sms": {
    title: "Масови SMS",
    description:
      "Персонализирайте едно SMS съобщение за всеки контакт, проверете телефонните номера и копирайте или експортирайте списъка.",
  },
  "bulk-email": {
    title: "Масови имейли",
    description:
      "Персонализирайте един имейл за всеки контакт, проверете имейл адресите и копирайте или експортирайте списъка.",
  },
  "audio-to-text": {
    title: "Аудио към текст",
    description:
      "Превърнете аудиозаписи в редактируем текст с частно транскрибиране в браузера. Аудиофайлът не се качва никъде.",
  },
};

const toolTextCa: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Etiqueta d'enviament i factura PDF",
    description:
      "Ajusta etiquetes d'enviament i factures de qualsevol PDF a pàgines d'impressió exactes 4×6, 100×150 mm o personalitzades, sense estirar ni tallar el contingut.",
  },
  compressor: {
    title: "Compressor d'imatges",
    description: "Redueix la mida del fitxer d'imatge mantenint una qualitat excel·lent.",
  },
  "favicon-generator": {
    title: "Generador de favicons",
    description:
      "Crea imatges favicon en diverses mides a partir de fitxers PNG, JPG, WebP o SVG.",
  },
  "qr-code-generator": {
    title: "Generador de codis QR",
    description:
      "Crea codis QR a partir d'URLs, text i altra informació a l'instant.",
  },
  "unit-converter": {
    title: "Conversor d'unitats",
    description:
      "Converteix unitats de longitud, pes i temperatura a l'instant amb un conversor en línia senzill.",
  },
  "percentage-calculator": {
    title: "Calculadora de percentatges",
    description: "Calcula el percentatge de qualsevol nombre de manera ràpida i senzilla.",
  },
  "case-converter": {
    title: "Conversor de majúscules i minúscules",
    description:
      "Converteix text a majúscules, minúscules, format de títol o de frase a l'instant.",
  },
  "character-counter": {
    title: "Comptador de caràcters",
    description:
      "Compta caràcters, espais, paraules, frases i paràgrafs a l'instant.",
  },
  "word-counter": {
    title: "Comptador de paraules",
    description:
      "Compta paraules, caràcters, frases, paràgrafs i línies a l'instant.",
  },
  "heic-to-jpg": {
    title: "HEIC a JPG",
    description: "Converteix imatges HEIC i HEIF a JPG en línia gratis.",
  },
  "compress-image-to-kb": {
    title: "Comprimir imatge a KB",
    description:
      "Comprimeix imatges a 20KB, 50KB, 100KB, 200KB o una mida personalitzada.",
  },
  "image-to-text": {
    title: "Imatge a text",
    description:
      "Extreu text de JPG, PNG, WebP i altres imatges amb OCR al navegador.",
  },
  converter: {
    title: "Conversor d'imatges",
    description:
      "Converteix JPG, PNG, WebP i altres formats d'imatge populars.",
  },
  resizer: {
    title: "Redimensionador d'imatges",
    description: "Redimensiona les imatges a les dimensions exactes en segons.",
  },
  cropper: {
    title: "Retallador d'imatges",
    description: "Retalla les imatges ràpidament amb dimensions precises.",
  },
  "image-to-pdf": {
    title: "Imatge a PDF",
    description: "Converteix una o diverses imatges en un document PDF.",
  },
  "webp-converter": {
    title: "Conversor de WebP",
    description: "Converteix imatges al format WebP, ràpid i eficient.",
  },
  rotator: {
    title: "Rotador d'imatges",
    description: "Gira i redreça les imatges amb facilitat.",
  },
  enhancer: {
    title: "Millorador d'imatges",
    description: "Millora la claredat i la qualitat visual de la imatge.",
  },
  "background-remover": {
    title: "Eliminador de fons",
    description:
      "Elimina el fons de les imatges i substitueix-lo per colors professionals.",
  },
  "image-metadata": {
    title: "Eina de metadades d'imatge",
    description:
      "Consulta les metadades, inspecciona la informació EXIF, elimina les metadades i baixa una imatge neta.",
  },
  "passport-photo": {
    title: "Foto mida passaport",
    description:
      "Crea fotos de mida passaport estàndard i fulls de fotos imprimibles.",
  },
  "batch-converter": {
    title: "Conversor per lots",
    description: "Processa diverses imatges juntes en un sol flux de treball.",
  },
  "image-to-word": {
    title: "Imatge a Word",
    description: "Converteix una o diverses imatges en un document de Word.",
  },
  "word-to-image": {
    title: "Word a imatge",
    description: "Converteix el teu document de Word en una imatge ràpidament.",
  },
  "pdf-merger": {
    title: "Unir PDF",
    description: "Combina diversos fitxers PDF en un sol document.",
  },
  "pdf-splitter": {
    title: "Dividir PDF",
    description: "Divideix un PDF en documents separats de manera ràpida i senzilla.",
  },
  "pdf-compressor": {
    title: "Comprimir PDF",
    description:
      "Redueix la mida del fitxer PDF mantenint els documents fàcils d'utilitzar.",
  },
  "pdf-to-word": {
    title: "PDF a Word",
    description: "Converteix fitxers PDF en documents de Word editables.",
  },
  "pdf-to-powerpoint": {
    title: "PDF a PowerPoint",
    description: "Converteix fitxers PDF en presentacions de PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF a Excel",
    description: "Converteix fitxers PDF en fulls de càlcul d'Excel.",
  },
  "word-to-pdf": {
    title: "Word a PDF",
    description: "Converteix documents de Word en fitxers PDF.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint a PDF",
    description: "Converteix presentacions de PowerPoint en fitxers PDF.",
  },
  "excel-to-pdf": {
    title: "Excel a PDF",
    description: "Converteix fulls de càlcul d'Excel en fitxers PDF.",
  },
  "pdf-editor": {
    title: "Editor de PDF",
    description: "Afegeix text a les pàgines del PDF i edita els teus documents.",
  },
  "pdf-to-jpg": {
    title: "PDF a JPG",
    description: "Converteix les pàgines del PDF en imatges JPG.",
  },
  "pdf-signer": {
    title: "Signar PDF",
    description: "Afegeix la teva signatura als documents PDF.",
  },
  "pdf-watermark": {
    title: "Marca d'aigua PDF",
    description: "Afegeix una marca d'aigua personalitzada a cada pàgina del teu PDF.",
  },
  "pdf-rotator": {
    title: "Girar PDF",
    description: "Gira les pàgines del PDF a l'orientació correcta.",
  },
  "html-to-pdf": {
    title: "HTML a PDF",
    description: "Converteix contingut HTML en un document PDF.",
  },
  "pdf-unlocker": {
    title: "Desbloquejar PDF",
    description:
      "Elimina les restriccions PDF de documents que estàs autoritzat a editar.",
  },
  "pdf-protector": {
    title: "Protegir PDF",
    description: "Afegeix ajustos de protecció als teus documents PDF.",
  },
  "pdf-organizer": {
    title: "Organitzar PDF",
    description: "Reordena, organitza i combina fitxers PDF.",
  },
  "pdf-to-pdfa": {
    title: "PDF a PDF/A",
    description: "Prepara documents PDF per a l'arxiu a llarg termini.",
  },
  "pdf-repair": {
    title: "Reparar PDF",
    description: "Intenta reparar fitxers PDF amb petits problemes estructurals.",
  },
  "pdf-page-numbers": {
    title: "Afegir números de pàgina al PDF",
    description: "Afegeix números de pàgina als teus documents PDF.",
  },
  "scan-to-pdf": {
    title: "Escanejar a PDF",
    description: "Converteix imatges escanejades en un document PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Extreu text cercable de documents PDF escanejats.",
  },
  "pdf-comparer": {
    title: "Comparar PDF",
    description: "Compara dos documents PDF i identifica les diferències bàsiques.",
  },
  "pdf-redactor": {
    title: "Censurar PDF",
    description: "Amaga informació sensible en documents PDF.",
  },
  "pdf-cropper": {
    title: "Retallar PDF",
    description: "Retalla les pàgines del PDF i elimina els marges no desitjats.",
  },
  "pdf-forms": {
    title: "Formularis PDF",
    description:
      "Omple els camps dels formularis PDF i afegeix informació als documents.",
  },
  "pdf-summarizer": {
    title: "Resumidor de PDF",
    description: "Resumeix documents PDF i comprèn el contingut clau.",
  },
  "pdf-translator": {
    title: "Traductor de PDF",
    description: "Tradueix documents PDF al teu idioma preferit.",
  },
  "pdf-to-markdown": {
    title: "PDF a Markdown",
    description: "Converteix documents PDF en fitxers Markdown.",
  },
  "social-qr-card": {
    title: "Targeta QR per a xarxes socials",
    description:
      "Crea un sol codi QR per a WhatsApp, Instagram, Facebook, X, YouTube i altres enllaços socials.",
  },
  "video-to-link": {
    title: "Vídeo → Enllaç",
    description:
      "Puja un vídeo i crea un enllaç compartible amb temps de caducitat.",
  },
  "bulk-sms": {
    title: "SMS massiu",
    description:
      "Personalitza un missatge SMS per a cada contact, valida els números de telèfon i copia o exporta la llista.",
  },
  "bulk-email": {
    title: "Correu massiu",
    description:
      "Personalitza un correu per a cada contact, valida les adreces de correu i copia o exporta la llista.",
  },
  "audio-to-text": {
    title: "D'àudio a text",
    description:
      "Converteix enregistraments d'àudio en text editable amb transcripció privada al navegador. El fitxer d'àudio no es puja mai.",
  },
};

const toolTextNl: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Verzendlabel & factuur PDF",
    description:
      "Past verzendlabels en facturen uit elke PDF op exacte 4×6-, 100×150-mm- of eigen afdrukpagina's aan, zonder uitrekken of bijsnijden.",
  },
  compressor: {
    title: "Afbeeldingscompressor",
    description:
      "Verklein de bestandsgrootte van afbeeldingen met behoud van uitstekende kwaliteit.",
  },
  "favicon-generator": {
    title: "Favicon-generator",
    description:
      "Maak favicon-afbeeldingen in meerdere formaten van PNG-, JPG-, WebP- of SVG-bestanden.",
  },
  "qr-code-generator": {
    title: "QR-codegenerator",
    description: "Maak direct QR-codes van URL's, tekst en andere informatie.",
  },
  "unit-converter": {
    title: "Eenhedenconvertor",
    description:
      "Converteer lengte-, gewicht- en temperatuureenheden direct met een eenvoudige online convertor.",
  },
  "percentage-calculator": {
    title: "Percentagecalculator",
    description: "Bereken snel en eenvoudig een percentage van elk getal.",
  },
  "case-converter": {
    title: "Hoofdletterconvertor",
    description:
      "Converteer tekst direct naar hoofdletters, kleine letters, titelkapitalisatie of zinskapitalisatie.",
  },
  "character-counter": {
    title: "Tekenteller",
    description: "Tel direct tekens, spaties, woorden, zinnen en alinea's.",
  },
  "word-counter": {
    title: "Woordenteller",
    description: "Tel direct woorden, tekens, zinnen, alinea's en regels.",
  },
  "heic-to-jpg": {
    title: "HEIC naar JPG",
    description: "Converteer HEIC- en HEIF-afbeeldingen gratis online naar JPG.",
  },
  "compress-image-to-kb": {
    title: "Afbeelding comprimeren naar KB",
    description:
      "Comprimeer afbeeldingen naar 20KB, 50KB, 100KB, 200KB of een aangepast formaat.",
  },
  "image-to-text": {
    title: "Afbeelding naar tekst",
    description:
      "Extraheer tekst uit JPG, PNG, WebP en andere afbeeldingen met OCR in de browser.",
  },
  converter: {
    title: "Afbeeldingsconvertor",
    description:
      "Converteer JPG, PNG, WebP en andere populaire afbeeldingsformaten.",
  },
  resizer: {
    title: "Afbeeldingsformaat wijzigen",
    description: "Wijzig afbeeldingen binnen seconden naar exacte afmetingen.",
  },
  cropper: {
    title: "Afbeelding bijsnijden",
    description: "Snijd afbeeldingen snel bij met nauwkeurige afmetingen.",
  },
  "image-to-pdf": {
    title: "Afbeelding naar PDF",
    description: "Zet een of meerdere afbeeldingen om in een PDF-document.",
  },
  "webp-converter": {
    title: "WebP-convertor",
    description: "Converteer afbeeldingen naar het snelle en efficiënte WebP-formaat.",
  },
  rotator: {
    title: "Afbeelding draaien",
    description: "Draai en rechttrek afbeeldingen met gemak.",
  },
  enhancer: {
    title: "Afbeeldingsverbeteraar",
    description: "Verbeter de helderheid en visuele kwaliteit van afbeeldingen.",
  },
  "background-remover": {
    title: "Achtergrondverwijderaar",
    description:
      "Verwijder achtergronden van afbeeldingen en vervang ze door professionele kleuren.",
  },
  "image-metadata": {
    title: "Tool voor afbeeldingsmetadata",
    description:
      "Bekijk metadata, inspecteer EXIF-informatie, verwijder metadata en download een schone afbeelding.",
  },
  "passport-photo": {
    title: "Pasfoto",
    description:
      "Maak pasfoto's op standaardformaat en afdrukbare fotovellen.",
  },
  "batch-converter": {
    title: "Batchconvertor",
    description: "Verwerk meerdere afbeeldingen samen in één werkstroom.",
  },
  "image-to-word": {
    title: "Afbeelding naar Word",
    description: "Converteer een of meerdere afbeeldingen naar een Word-document.",
  },
  "word-to-image": {
    title: "Word naar afbeelding",
    description: "Converteer je Word-document snel naar een afbeelding.",
  },
  "pdf-merger": {
    title: "PDF samenvoegen",
    description: "Combineer meerdere PDF-bestanden tot één document.",
  },
  "pdf-splitter": {
    title: "PDF splitsen",
    description: "Splits een PDF snel en eenvoudig in afzonderlijke documenten.",
  },
  "pdf-compressor": {
    title: "PDF comprimeren",
    description:
      "Verklein de PDF-bestandsgrootte terwijl documenten bruikbaar blijven.",
  },
  "pdf-to-word": {
    title: "PDF naar Word",
    description: "Converteer PDF-bestanden naar bewerkbare Word-documenten.",
  },
  "pdf-to-powerpoint": {
    title: "PDF naar PowerPoint",
    description: "Converteer PDF-bestanden naar PowerPoint-presentaties.",
  },
  "pdf-to-excel": {
    title: "PDF naar Excel",
    description: "Converteer PDF-bestanden naar Excel-spreadsheets.",
  },
  "word-to-pdf": {
    title: "Word naar PDF",
    description: "Converteer Word-documenten naar PDF-bestanden.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint naar PDF",
    description: "Converteer PowerPoint-presentaties naar PDF-bestanden.",
  },
  "excel-to-pdf": {
    title: "Excel naar PDF",
    description: "Converteer Excel-spreadsheets naar PDF-bestanden.",
  },
  "pdf-editor": {
    title: "PDF-editor",
    description: "Voeg tekst toe aan PDF-pagina's en bewerk je documenten.",
  },
  "pdf-to-jpg": {
    title: "PDF naar JPG",
    description: "Converteer PDF-pagina's naar JPG-afbeeldingen.",
  },
  "pdf-signer": {
    title: "PDF ondertekenen",
    description: "Voeg je handtekening toe aan PDF-documenten.",
  },
  "pdf-watermark": {
    title: "PDF-watermerk",
    description: "Voeg een aangepast watermerk toe aan elke pagina van je PDF.",
  },
  "pdf-rotator": {
    title: "PDF draaien",
    description: "Draai PDF-pagina's naar de juiste oriëntatie.",
  },
  "html-to-pdf": {
    title: "HTML naar PDF",
    description: "Converteer HTML-inhoud naar een PDF-document.",
  },
  "pdf-unlocker": {
    title: "PDF ontgrendelen",
    description:
      "Verwijder PDF-beperkingen van documenten die je mag bewerken.",
  },
  "pdf-protector": {
    title: "PDF beveiligen",
    description: "Voeg beveiligingsinstellingen toe aan je PDF-documenten.",
  },
  "pdf-organizer": {
    title: "PDF organiseren",
    description: "Herschik, organiseer en combineer PDF-bestanden.",
  },
  "pdf-to-pdfa": {
    title: "PDF naar PDF/A",
    description: "Maak PDF-documenten gereed voor langdurige archivering.",
  },
  "pdf-repair": {
    title: "PDF repareren",
    description: "Probeer PDF-bestanden met kleine structurele problemen te repareren.",
  },
  "pdf-page-numbers": {
    title: "PDF-paginanummers toevoegen",
    description: "Voeg paginanummers toe aan je PDF-documenten.",
  },
  "scan-to-pdf": {
    title: "Scannen naar PDF",
    description: "Converteer gescande afbeeldingen naar een PDF-document.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Extraheer doorzoekbare tekst uit gescande PDF-documenten.",
  },
  "pdf-comparer": {
    title: "PDF vergelijken",
    description: "Vergelijk twee PDF-documenten en vind de belangrijkste verschillen.",
  },
  "pdf-redactor": {
    title: "PDF redigeren",
    description: "Verberg gevoelige informatie in PDF-documenten.",
  },
  "pdf-cropper": {
    title: "PDF bijsnijden",
    description: "Snijd PDF-pagina's bij en verwijder ongewenste marges.",
  },
  "pdf-forms": {
    title: "PDF-formulieren",
    description:
      "Vul PDF-formuliervelden in en voeg informatie toe aan documenten.",
  },
  "pdf-summarizer": {
    title: "PDF-samenvatter",
    description: "Vat PDF-documenten samen en begrijp de belangrijkste inhoud.",
  },
  "pdf-translator": {
    title: "PDF-vertaler",
    description: "Vertaal PDF-documenten naar je gewenste taal.",
  },
  "pdf-to-markdown": {
    title: "PDF naar Markdown",
    description: "Converteer PDF-documenten naar Markdown-bestanden.",
  },
  "social-qr-card": {
    title: "QR-kaart voor sociale media",
    description:
      "Maak één QR-code voor WhatsApp, Instagram, Facebook, X, YouTube en andere sociale links.",
  },
  "video-to-link": {
    title: "Video → Link",
    description: "Upload een video en maak een deelbare link met vervaltijd.",
  },
  "bulk-sms": {
    title: "Bulk-sms",
    description:
      "Personaliseer één sms-bericht per contact, valideer telefoonnummers en kopieer of exporteer de lijst.",
  },
  "bulk-email": {
    title: "Bulk-e-mail",
    description:
      "Personaliseer één e-mail per contact, valideer e-mailadressen en kopieer of exporteer de lijst.",
  },
  "audio-to-text": {
    title: "Audio naar tekst",
    description:
      "Zet audio-opnames om in bewerkbare tekst met privé-transcriptie in de browser. Je audiobestand wordt nooit geüpload.",
  },
};

const toolTextEl: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Ετικέτα αποστολής & τιμολόγιο PDF",
    description:
      "Ταιριάζει ετικέτες αποστολής και τιμολόγια από οποιδήποτο PDF σε ακριβές σελίδες 4×6, 100×150 mm ή προσαρμοσμένες, χωρίς τέντωμα ή κοπή.",
  },
  compressor: {
    title: "Συμπίεση εικόνων",
    description:
      "Μειώστε το μέγεθος του αρχείου εικόνας διατηρώντας εξαιρετική ποιότητα.",
  },
  "favicon-generator": {
    title: "Γεννήτρια favicon",
    description:
      "Δημιουργήστε εικόνες favicon σε πολλά μεγέθη από αρχεία PNG, JPG, WebP ή SVG.",
  },
  "qr-code-generator": {
    title: "Γεννήτρια κωδικών QR",
    description:
      "Δημιουργήστε κωδικούς QR από URL, κείμενο και άλλες πληροφορίες άμεσα.",
  },
  "unit-converter": {
    title: "Μετατροπέας μονάδων",
    description:
      "Μετατρέψτε μονάδες μήκους, βάρους και θερμοκρασίας άμεσα με έναν απλό διαδικτυακό μετατροπέα.",
  },
  "percentage-calculator": {
    title: "Αριθμομηχανή ποσοστών",
    description: "Υπολογίστε το ποσοστό οποιουδήποτε αριθμού γρήγορα και εύκολα.",
  },
  "case-converter": {
    title: "Μετατροπέας πεζών/κεφαλαίων",
    description:
      "Μετατρέψτε κείμενο σε κεφαλαία, πεζά, μορφή τίτλου ή πρότασης άμεσα.",
  },
  "character-counter": {
    title: "Μετρητής χαρακτήρων",
    description:
      "Μετρήστε χαρακτήρες, κενά, λέξεις, προτάσεις και παραγράφους άμεσα.",
  },
  "word-counter": {
    title: "Μετρητής λέξεων",
    description:
      "Μετρήστε λέξεις, χαρακτήρες, προτάσεις, παραγράφους και γραμμές άμεσα.",
  },
  "heic-to-jpg": {
    title: "HEIC σε JPG",
    description: "Μετατρέψτε εικόνες HEIC και HEIF σε JPG δωρεάν στο διαδίκτυο.",
  },
  "compress-image-to-kb": {
    title: "Συμπίεση εικόνας σε KB",
    description:
      "Συμπιέστε εικόνες σε 20KB, 50KB, 100KB, 200KB ή προσαρμοσμένο μέγεθος.",
  },
  "image-to-text": {
    title: "Εικόνα σε κείμενο",
    description:
      "Εξάγετε κείμενο από JPG, PNG, WebP και άλλες εικόνες με OCR στον περιηγητή.",
  },
  converter: {
    title: "Μετατροπέας εικόνων",
    description:
      "Μετατρέψτε JPG, PNG, WebP και άλλες δημοφιλείς μορφές εικόνας.",
  },
  resizer: {
    title: "Αλλαγή μεγέθους εικόνων",
    description:
      "Αλλάξτε το μέγεθος των εικόνων στις ακριβείς διαστάσεις σε δευτερόλεπτα.",
  },
  cropper: {
    title: "Περικοπή εικόνων",
    description: "Περικόψτε τις εικόνες σας γρήγορα με ακριβείς διαστάσεις.",
  },
  "image-to-pdf": {
    title: "Εικόνα σε PDF",
    description: "Μετατρέψτε μία ή πολλές εικόνες σε έγγραφο PDF.",
  },
  "webp-converter": {
    title: "Μετατροπέας WebP",
    description: "Μετατρέψτε εικόνες στη γρήγορη και αποδοτική μορφή WebP.",
  },
  rotator: {
    title: "Περιστροφή εικόνων",
    description: "Περιστρέψτε και ισιώστε τις εικόνες σας με ευκολία.",
  },
  enhancer: {
    title: "Βελτίωση εικόνων",
    description: "Βελτιώστε τη σαφήνεια και την οπτική ποιότητα της εικόνας.",
  },
  "background-remover": {
    title: "Αφαίρεση φόντου",
    description:
      "Αφαιρέστε το φόντο των εικόνων και αντικαταστήστε το με επαγγελματικά χρώματα.",
  },
  "image-metadata": {
    title: "Εργαλείο μεταδεδομένων εικόνας",
    description:
      "Δείτε τα μεταδεδομένα, ελέγξτε τις πληροφορίες EXIF, αφαιρέστε τα μεταδεδομένα και κατεβάστε καθαρή εικόνα.",
  },
  "passport-photo": {
    title: "Φωτογραφία μεγέθους διαβατηρίου",
    description:
      "Δημιουργήστε φωτογραφίες τυπικού μεγέθους διαβατηρίου και εκτυπώσιμα φύλλα φωτογραφιών.",
  },
  "batch-converter": {
    title: "Μαζικός μετατροπέας",
    description: "Επεξεργαστείτε πολλές εικόνες μαζί σε μία ροή εργασίας.",
  },
  "image-to-word": {
    title: "Εικόνα σε Word",
    description: "Μετατρέψτε μία ή πολλές εικόνες σε έγγραφο Word.",
  },
  "word-to-image": {
    title: "Word σε εικόνα",
    description: "Μετατρέψτε το έγγραφο Word σας σε εικόνα γρήγορα.",
  },
  "pdf-merger": {
    title: "Συγχώνευση PDF",
    description: "Συνδυάστε πολλά αρχεία PDF σε ένα έγγραφο.",
  },
  "pdf-splitter": {
    title: "Διαχωρισμός PDF",
    description: "Χωρίστε ένα PDF σε ξεχωριστά έγγραφα γρήγορα και εύκολα.",
  },
  "pdf-compressor": {
    title: "Συμπίεση PDF",
    description:
      "Μειώστε το μέγεθος του αρχείου PDF διατηρώντας τα έγγραφα εύχρηστα.",
  },
  "pdf-to-word": {
    title: "PDF σε Word",
    description: "Μετατρέψτε αρχεία PDF σε επεξεργάσιμα έγγραφα Word.",
  },
  "pdf-to-powerpoint": {
    title: "PDF σε PowerPoint",
    description: "Μετατρέψτε αρχεία PDF σε παρουσιάσεις PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF σε Excel",
    description: "Μετατρέψτε αρχεία PDF σε υπολογιστικά φύλλα Excel.",
  },
  "word-to-pdf": {
    title: "Word σε PDF",
    description: "Μετατρέψτε έγγραφα Word σε αρχεία PDF.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint σε PDF",
    description: "Μετατρέψτε παρουσιάσεις PowerPoint σε αρχεία PDF.",
  },
  "excel-to-pdf": {
    title: "Excel σε PDF",
    description: "Μετατρέψτε υπολογιστικά φύλλα Excel σε αρχεία PDF.",
  },
  "pdf-editor": {
    title: "Επεξεργαστής PDF",
    description:
      "Προσθέστε κείμενο στις σελίδες PDF και επεξεργαστείτε τα έγγραφά σας.",
  },
  "pdf-to-jpg": {
    title: "PDF σε JPG",
    description: "Μετατρέψτε τις σελίδες PDF σε εικόνες JPG.",
  },
  "pdf-signer": {
    title: "Υπογραφή PDF",
    description: "Προσθέστε την υπογραφή σας σε έγγραφα PDF.",
  },
  "pdf-watermark": {
    title: "Υδατογράφημα PDF",
    description: "Προσθέστε προσαρμοσμένο υδατογράφημα σε κάθε σελίδα του PDF.",
  },
  "pdf-rotator": {
    title: "Περιστροφή PDF",
    description: "Περιστρέψτε τις σελίδες PDF στη σωστή κατεύθυνση.",
  },
  "html-to-pdf": {
    title: "HTML σε PDF",
    description: "Μετατρέψτε περιεχόμενο HTML σε έγγραφο PDF.",
  },
  "pdf-unlocker": {
    title: "Ξεκλείδωμα PDF",
    description:
      "Αφαιρέστε τους περιορισμούς PDF από έγγραφα που έχετε δικαίωμα να επεξεργαστείτε.",
  },
  "pdf-protector": {
    title: "Προστασία PDF",
    description: "Προσθέστε ρυθμίσεις προστασίας στα έγγραφα PDF σας.",
  },
  "pdf-organizer": {
    title: "Οργάνωση PDF",
    description: "Αναδιατάξτε, οργανώστε και συνδυάστε αρχεία PDF.",
  },
  "pdf-to-pdfa": {
    title: "PDF σε PDF/A",
    description: "Προετοιμάστε έγγραφα PDF για μακροπρόθεσμη αρχειοθέτηση.",
  },
  "pdf-repair": {
    title: "Επιδιόρθωση PDF",
    description:
      "Δοκιμάστε να επιδιορθώσετε αρχεία PDF με μικρά δομικά προβλήματα.",
  },
  "pdf-page-numbers": {
    title: "Προσθήκη αριθμών σελίδας σε PDF",
    description: "Προσθέστε αριθμούς σελίδας στα έγγραφα PDF σας.",
  },
  "scan-to-pdf": {
    title: "Σάρωση σε PDF",
    description: "Μετατρέψτε σαρωμένες εικόνες σε έγγραφο PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Εξάγετε αναζητήσιμο κείμενο από σαρωμένα έγγραφα PDF.",
  },
  "pdf-comparer": {
    title: "Σύγκριση PDF",
    description: "Συγκρίνετε δύο έγγραφα PDF και εντοπίστε τις βασικές διαφορές.",
  },
  "pdf-redactor": {
    title: "Απόκρυψη PDF",
    description: "Αποκρύψτε ευαίσθητες πληροφορίες σε έγγραφα PDF.",
  },
  "pdf-cropper": {
    title: "Περικοπή PDF",
    description: "Περικόψτε τις σελίδες PDF και αφαιρέστε τα ανεπιθύμητα περιθώρια.",
  },
  "pdf-forms": {
    title: "Φόρμες PDF",
    description:
      "Συμπληρώστε πεδία φόρμας PDF και προσθέστε πληροφορίες στα έγγραφα.",
  },
  "pdf-summarizer": {
    title: "Σύνοψη PDF",
    description: "Συνοψίστε έγγραφα PDF και κατανοήστε το βασικό περιεχόμενο.",
  },
  "pdf-translator": {
    title: "Μεταφραστής PDF",
    description: "Μεταφράστε έγγραφα PDF στη γλώσσα που προτιμάτε.",
  },
  "pdf-to-markdown": {
    title: "PDF σε Markdown",
    description: "Μετατρέψτε έγγραφα PDF σε αρχεία Markdown.",
  },
  "social-qr-card": {
    title: "Κάρτα QR για κοινωνικά δίκτυα",
    description:
      "Δημιουργήστε έναν κωδικό QR για WhatsApp, Instagram, Facebook, X, YouTube και άλλους κοινωνικούς συνδέσμους.",
  },
  "video-to-link": {
    title: "Βίντεο → Σύνδεσμος",
    description:
      "Ανεβάστε ένα βίντεο και δημιουργήστε έναν κοινόχρηστο σύνδεσμο με χρόνο λήξης.",
  },
  "bulk-sms": {
    title: "Μαζικά SMS",
    description:
      "Δημιουργήστε ένα προσαρμοσμένο μήνυμα SMS για κάθε επαφή, ελέγξτε τις τηλεφωνικές αριθμούς και αντιγράψτε ή εξάγετε τη λίστα.",
  },
  "bulk-email": {
    title: "Μαζικά email",
    description:
      "Δημιουργήστε ένα προσαρμοσμένο email για κάθε επαφή, ελέγξτε τις διευθύνσεις email και αντιγράψτε ή εξάγετε τη λίστα.",
  },
  "audio-to-text": {
    title: "Ήχος σε κείμενο",
    description:
      "Μετατρέψτε ηχογραφήσεις σε επεξεργάσιμο κείμενο με ιδιωτική απομαγνητοφώνηση στο πρόγραμμα περιήγησης. Το αρχείο ήχου δεν ανεβαίνει πουθενά.",
  },
};

const toolTextId: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Label Pengiriman & Faktur PDF",
    description:
      "Sesuaikan label pengiriman dan faktur dari PDF apa pun ke halaman cetak 4×6, 100×150 mm, atau kustom yang tepat tanpa meregang atau memotong isi.",
  },
  compressor: {
    title: "Kompresor Gambar",
    description: "Kurangi ukuran file gambar sambil mempertahankan kualitas terbaik.",
  },
  "favicon-generator": {
    title: "Pembuat Favicon",
    description:
      "Buat gambar favicon dalam berbagai ukuran dari file PNG, JPG, WebP, atau SVG.",
  },
  "qr-code-generator": {
    title: "Pembuat Kode QR",
    description: "Buat kode QR dari URL, teks, dan informasi lain secara instan.",
  },
  "unit-converter": {
    title: "Konverter Satuan",
    description:
      "Konversi satuan panjang, berat, dan suhu secara instan dengan konverter online yang mudah.",
  },
  "percentage-calculator": {
    title: "Kalkulator Persentase",
    description: "Hitung persentase dari angka apa pun dengan cepat dan mudah.",
  },
  "case-converter": {
    title: "Konverter Huruf",
    description:
      "Konversi teks ke huruf besar, kecil, format judul, atau format kalimat secara instan.",
  },
  "character-counter": {
    title: "Penghitung Karakter",
    description: "Hitung karakter, spasi, kata, kalimat, dan paragraf secara instan.",
  },
  "word-counter": {
    title: "Penghitung Kata",
    description: "Hitung kata, karakter, kalimat, paragraf, dan baris secara instan.",
  },
  "heic-to-jpg": {
    title: "HEIC ke JPG",
    description: "Konversi gambar HEIC dan HEIF ke JPG online gratis.",
  },
  "compress-image-to-kb": {
    title: "Kompres Gambar ke KB",
    description: "Kompres gambar ke 20KB, 50KB, 100KB, 200KB, atau ukuran khusus.",
  },
  "image-to-text": {
    title: "Gambar ke Teks",
    description:
      "Ekstrak teks dari JPG, PNG, WebP, dan gambar lain dengan OCR di browser.",
  },
  converter: {
    title: "Konverter Gambar",
    description: "Konversi JPG, PNG, WebP, dan format gambar populer lainnya.",
  },
  resizer: {
    title: "Pengubah Ukuran Gambar",
    description: "Ubah ukuran gambar ke dimensi yang tepat dalam hitungan detik.",
  },
  cropper: {
    title: "Pemotong Gambar",
    description: "Potong gambar dengan cepat menggunakan dimensi yang presisi.",
  },
  "image-to-pdf": {
    title: "Gambar ke PDF",
    description: "Ubah satu atau beberapa gambar menjadi dokumen PDF.",
  },
  "webp-converter": {
    title: "Konverter WebP",
    description: "Konversi gambar ke format WebP yang cepat dan efisien.",
  },
  rotator: {
    title: "Pemutar Gambar",
    description: "Putar dan luruskan gambar dengan mudah.",
  },
  enhancer: {
    title: "Peningkat Gambar",
    description: "Tingkatkan kejernihan dan kualitas visual gambar.",
  },
  "background-remover": {
    title: "Penghapus Latar Belakang",
    description:
      "Hapus latar belakang gambar dan ganti dengan warna profesional.",
  },
  "image-metadata": {
    title: "Alat Metadata Gambar",
    description:
      "Lihat metadata gambar, periksa informasi EXIF, hapus metadata, dan unduh gambar yang bersih.",
  },
  "passport-photo": {
    title: "Foto Ukuran Paspor",
    description:
      "Buat foto ukuran paspor standar dan lembar foto yang dapat dicetak.",
  },
  "batch-converter": {
    title: "Konverter Batch",
    description: "Proses beberapa gambar bersama dalam satu alur kerja.",
  },
  "image-to-word": {
    title: "Gambar ke Word",
    description: "Konversi satu atau beberapa gambar menjadi dokumen Word.",
  },
  "word-to-image": {
    title: "Word ke Gambar",
    description: "Konversi dokumen Word Anda menjadi gambar dengan cepat.",
  },
  "pdf-merger": {
    title: "Gabungkan PDF",
    description: "Gabungkan beberapa file PDF menjadi satu dokumen.",
  },
  "pdf-splitter": {
    title: "Pisahkan PDF",
    description: "Pisahkan PDF menjadi dokumen terpisah dengan cepat dan mudah.",
  },
  "pdf-compressor": {
    title: "Kompres PDF",
    description:
      "Kurangi ukuran file PDF sambil menjaga dokumen tetap mudah digunakan.",
  },
  "pdf-to-word": {
    title: "PDF ke Word",
    description: "Konversi file PDF menjadi dokumen Word yang dapat diedit.",
  },
  "pdf-to-powerpoint": {
    title: "PDF ke PowerPoint",
    description: "Konversi file PDF menjadi presentasi PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF ke Excel",
    description: "Konversi file PDF menjadi spreadsheet Excel.",
  },
  "word-to-pdf": {
    title: "Word ke PDF",
    description: "Konversi dokumen Word menjadi file PDF.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint ke PDF",
    description: "Konversi presentasi PowerPoint menjadi file PDF.",
  },
  "excel-to-pdf": {
    title: "Excel ke PDF",
    description: "Konversi spreadsheet Excel menjadi file PDF.",
  },
  "pdf-editor": {
    title: "Editor PDF",
    description: "Tambahkan teks pada halaman PDF dan edit dokumen Anda.",
  },
  "pdf-to-jpg": {
    title: "PDF ke JPG",
    description: "Konversi halaman PDF menjadi gambar JPG.",
  },
  "pdf-signer": {
    title: "Tanda Tangani PDF",
    description: "Tambahkan tanda tangan Anda pada dokumen PDF.",
  },
  "pdf-watermark": {
    title: "Tanda Air PDF",
    description: "Tambahkan tanda air khusus pada setiap halaman PDF Anda.",
  },
  "pdf-rotator": {
    title: "Putar PDF",
    description: "Putar halaman PDF ke orientasi yang benar.",
  },
  "html-to-pdf": {
    title: "HTML ke PDF",
    description: "Konversi konten HTML menjadi dokumen PDF.",
  },
  "pdf-unlocker": {
    title: "Buka Kunci PDF",
    description:
      "Hapus batasan PDF dari dokumen yang Anda berwenang untuk mengedit.",
  },
  "pdf-protector": {
    title: "Lindungi PDF",
    description: "Tambahkan pengaturan perlindungan pada dokumen PDF Anda.",
  },
  "pdf-organizer": {
    title: "Atur PDF",
    description: "Susun ulang, atur, dan gabungkan file PDF.",
  },
  "pdf-to-pdfa": {
    title: "PDF ke PDF/A",
    description: "Siapkan dokumen PDF untuk pengarsipan jangka panjang.",
  },
  "pdf-repair": {
    title: "Perbaiki PDF",
    description: "Coba perbaiki file PDF dengan masalah struktural ringan.",
  },
  "pdf-page-numbers": {
    title: "Tambah Nomor Halaman PDF",
    description: "Tambahkan nomor halaman pada dokumen PDF Anda.",
  },
  "scan-to-pdf": {
    title: "Pindai ke PDF",
    description: "Konversi gambar hasil pindai menjadi dokumen PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Ekstrak teks yang dapat dicari dari dokumen PDF hasil pindai.",
  },
  "pdf-comparer": {
    title: "Bandingkan PDF",
    description: "Bandingkan dua dokumen PDF dan identifikasi perbedaan dasar.",
  },
  "pdf-redactor": {
    title: "Redaksi PDF",
    description: "Sembunyikan informasi sensitif dalam dokumen PDF.",
  },
  "pdf-cropper": {
    title: "Potong PDF",
    description: "Potong halaman PDF dan hapus margin yang tidak diinginkan.",
  },
  "pdf-forms": {
    title: "Formulir PDF",
    description:
      "Isi kolom formulir PDF dan tambahkan informasi ke dokumen.",
  },
  "pdf-summarizer": {
    title: "Peringkas PDF",
    description: "Ringkas dokumen PDF dan pahami konten utama.",
  },
  "pdf-translator": {
    title: "Penerjemah PDF",
    description: "Terjemahkan dokumen PDF ke bahasa pilihan Anda.",
  },
  "pdf-to-markdown": {
    title: "PDF ke Markdown",
    description: "Konversi dokumen PDF menjadi file Markdown.",
  },
  "social-qr-card": {
    title: "Kartu QR Media Sosial",
    description:
      "Buat satu kode QR untuk WhatsApp, Instagram, Facebook, X, YouTube, dan tautan sosial lainnya.",
  },
  "video-to-link": {
    title: "Video → Tautan",
    description:
      "Unggah video dan buat tautan yang dapat dibagikan dengan waktu kedaluwarsa.",
  },
  "bulk-sms": {
    title: "SMS Massal",
    description:
      "Personalisasi satu pesan SMS untuk setiap kontak, validasi nomor telepon, lalu salin atau ekspor daftar.",
  },
  "bulk-email": {
    title: "Email Massal",
    description:
      "Personalisasi satu email untuk setiap kontak, validasi alamat email, lalu salin atau ekspor daftar.",
  },
  "audio-to-text": {
    title: "Audio ke teks",
    description:
      "Ubah rekaman audio menjadi teks yang dapat diedit dengan transkripsi privat di berkas. File audio tidak pernah diunggah.",
  },
};

const toolTextMs: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Label Penghantaran & Invois PDF",
    description:
      "Muatkan label penghantaran dan invois daripada sebarang PDF ke halaman cetak tepat 4×6, 100×150 mm atau tersuai tanpa diregang atau dipotong.",
  },
  compressor: {
    title: "Pemampat Imej",
    description: "Kurangkan saiz fail imej sambil mengekalkan kualiti yang sangat baik.",
  },
  "favicon-generator": {
    title: "Penjana Favicon",
    description:
      "Cipta imej favicon dalam pelbagai saiz daripada fail PNG, JPG, WebP atau SVG.",
  },
  "qr-code-generator": {
    title: "Penjana Kod QR",
    description: "Cipta kod QR daripada URL, teks dan maklumat lain dengan pantas.",
  },
  "unit-converter": {
    title: "Penukar Unit",
    description:
      "Tukar unit panjang, berat dan suhu dengan pantas menggunakan penukar dalam talian yang mudah.",
  },
  "percentage-calculator": {
    title: "Kalkulator Peratusan",
    description: "Kira peratusan mana-mana nombor dengan cepat dan mudah.",
  },
  "case-converter": {
    title: "Penukar Huruf",
    description:
      "Tukar teks kepada huruf besar, huruf kecil, format tajuk atau format ayat dengan pantas.",
  },
  "character-counter": {
    title: "Pengira Aksara",
    description: "Kira aksara, ruang, perkataan, ayat dan perenggan dengan pantas.",
  },
  "word-counter": {
    title: "Pengira Perkataan",
    description: "Kira perkataan, aksara, ayat, perenggan dan baris dengan pantas.",
  },
  "heic-to-jpg": {
    title: "HEIC ke JPG",
    description: "Tukar imej HEIC dan HEIF kepada JPG dalam talian secara percuma.",
  },
  "compress-image-to-kb": {
    title: "Mampatkan Imej ke KB",
    description: "Mampatkan imej kepada 20KB, 50KB, 100KB, 200KB atau saiz tersuai.",
  },
  "image-to-text": {
    title: "Imej ke Teks",
    description:
      "Ekstrak teks daripada JPG, PNG, WebP dan imej lain dengan OCR dalam pelayar.",
  },
  converter: {
    title: "Penukar Imej",
    description: "Tukar JPG, PNG, WebP dan format imej popular yang lain.",
  },
  resizer: {
    title: "Pengubah Saiz Imej",
    description: "Ubah saiz imej kepada dimensi tepat dalam beberapa saat.",
  },
  cropper: {
    title: "Pemotong Imej",
    description: "Potong imej anda dengan cepat menggunakan dimensi yang tepat.",
  },
  "image-to-pdf": {
    title: "Imej ke PDF",
    description: "Tukar satu atau beberapa imej kepada dokumen PDF.",
  },
  "webp-converter": {
    title: "Penukar WebP",
    description: "Tukar imej kepada format WebP yang pantas dan cekap.",
  },
  rotator: {
    title: "Pemutar Imej",
    description: "Putar dan luruskan imej anda dengan mudah.",
  },
  enhancer: {
    title: "Penambahbaik Imej",
    description: "Tingkatkan kejelasan dan kualiti visual imej.",
  },
  "background-remover": {
    title: "Pembuang Latar Belakang",
    description:
      "Buang latar belakang imej dan gantikan dengan warna profesional.",
  },
  "image-metadata": {
    title: "Alat Metadata Imej",
    description:
      "Lihat metadata imej, periksa maklumat EXIF, buang metadata dan muat turun imej yang bersih.",
  },
  "passport-photo": {
    title: "Foto Saiz Pasport",
    description:
      "Cipta foto saiz pasport standard dan helaian foto yang boleh dicetak.",
  },
  "batch-converter": {
    title: "Penukar Kelompok",
    description: "Proses beberapa imej bersama dalam satu aliran kerja.",
  },
  "image-to-word": {
    title: "Imej ke Word",
    description: "Tukar satu atau beberapa imej kepada dokumen Word.",
  },
  "word-to-image": {
    title: "Word ke Imej",
    description: "Tukar dokumen Word anda kepada imej dengan cepat.",
  },
  "pdf-merger": {
    title: "Gabung PDF",
    description: "Gabungkan beberapa fail PDF menjadi satu dokumen.",
  },
  "pdf-splitter": {
    title: "Pisah PDF",
    description: "Pisahkan PDF kepada dokumen berasingan dengan cepat dan mudah.",
  },
  "pdf-compressor": {
    title: "Mampat PDF",
    description:
      "Kurangkan saiz fail PDF sambil mengekalkan dokumen mudah digunakan.",
  },
  "pdf-to-word": {
    title: "PDF ke Word",
    description: "Tukar fail PDF kepada dokumen Word yang boleh diedit.",
  },
  "pdf-to-powerpoint": {
    title: "PDF ke PowerPoint",
    description: "Tukar fail PDF kepada persembahan PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF ke Excel",
    description: "Tukar fail PDF kepada hamparan Excel.",
  },
  "word-to-pdf": {
    title: "Word ke PDF",
    description: "Tukar dokumen Word kepada fail PDF.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint ke PDF",
    description: "Tukar persembahan PowerPoint kepada fail PDF.",
  },
  "excel-to-pdf": {
    title: "Excel ke PDF",
    description: "Tukar hamparan Excel kepada fail PDF.",
  },
  "pdf-editor": {
    title: "Editor PDF",
    description: "Tambah teks pada halaman PDF dan edit dokumen anda.",
  },
  "pdf-to-jpg": {
    title: "PDF ke JPG",
    description: "Tukar halaman PDF kepada imej JPG.",
  },
  "pdf-signer": {
    title: "Tandatangan PDF",
    description: "Tambah tandatangan anda pada dokumen PDF.",
  },
  "pdf-watermark": {
    title: "Terap Air PDF",
    description: "Tambah terap air tersuai pada setiap halaman PDF anda.",
  },
  "pdf-rotator": {
    title: "Putar PDF",
    description: "Putar halaman PDF ke orientasi yang betul.",
  },
  "html-to-pdf": {
    title: "HTML ke PDF",
    description: "Tukar kandungan HTML kepada dokumen PDF.",
  },
  "pdf-unlocker": {
    title: "Buka Kunci PDF",
    description:
      "Buang sekatan PDF daripada dokumen yang anda dibenarkan untuk edit.",
  },
  "pdf-protector": {
    title: "Lindungi PDF",
    description: "Tambah tetapan perlindungan pada dokumen PDF anda.",
  },
  "pdf-organizer": {
    title: "Susun PDF",
    description: "Susun semula, atur dan gabungkan fail PDF.",
  },
  "pdf-to-pdfa": {
    title: "PDF ke PDF/A",
    description: "Sediakan dokumen PDF untuk pengarkiban jangka panjang.",
  },
  "pdf-repair": {
    title: "Baiki PDF",
    description: "Cuba baiki fail PDF dengan masalah struktur kecil.",
  },
  "pdf-page-numbers": {
    title: "Tambah Nombor Halaman PDF",
    description: "Tambah nombor halaman pada dokumen PDF anda.",
  },
  "scan-to-pdf": {
    title: "Imbas ke PDF",
    description: "Tukar imej yang diimbas kepada dokumen PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Ekstrak teks yang boleh dicari daripada dokumen PDF yang diimbas.",
  },
  "pdf-comparer": {
    title: "Banding PDF",
    description: "Banding dua dokumen PDF dan kenal pasti perbezaan asas.",
  },
  "pdf-redactor": {
    title: "Redaksi PDF",
    description: "Sembunyikan maklumat sensitif dalam dokumen PDF.",
  },
  "pdf-cropper": {
    title: "Potong PDF",
    description: "Potong halaman PDF dan buang margin yang tidak dikehendaki.",
  },
  "pdf-forms": {
    title: "Borang PDF",
    description:
      "Isi medan borang PDF dan tambah maklumat pada dokumen.",
  },
  "pdf-summarizer": {
    title: "Peringkas PDF",
    description: "Ringkaskan dokumen PDF dan fahami kandungan utama.",
  },
  "pdf-translator": {
    title: "Penterjemah PDF",
    description: "Terjemah dokumen PDF ke bahasa pilihan anda.",
  },
  "pdf-to-markdown": {
    title: "PDF ke Markdown",
    description: "Tukar dokumen PDF kepada fail Markdown.",
  },
  "social-qr-card": {
    title: "Kad QR Media Sosial",
    description:
      "Cipta satu kod QR untuk WhatsApp, Instagram, Facebook, X, YouTube dan pautan sosial lain.",
  },
  "video-to-link": {
    title: "Video → Pautan",
    description:
      "Muat naik video dan cipta pautan boleh kongsi dengan masa tamat tempoh.",
  },
  "bulk-sms": {
    title: "SMS Pukal",
    description:
      "Personalisasikan satu mesej SMS untuk setiap kenalan, sahkan nombor telefon, kemudian salin atau eksport senarai.",
  },
  "bulk-email": {
    title: "E-mel Pukal",
    description:
      "Personalisasikan satu e-mel untuk setiap kenalan, sahkan alamat e-mel, kemudian salin atau eksport senarai.",
  },
  "audio-to-text": {
    title: "Audio kepada teks",
    description:
      "Tukar rakaman audio kepada teks yang boleh disunting dengan transkripsi peribadi dalam pelayar. Fail audio tidak pernah dimuat naik.",
  },
};

const toolTextPl: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Etykieta wysyłkowa i faktura PDF",
    description:
      "Dopasowuje etykiety wysyłkowe i faktury z dowolnego PDF do dokładnych stron 4×6, 100×150 mm lub własnych, bez rozciągania i przycinania.",
  },
  compressor: {
    title: "Kompresor obrazów",
    description: "Zmniejsz rozmiar pliku obrazu, zachowując doskonałą jakość.",
  },
  "favicon-generator": {
    title: "Generator favikon",
    description:
      "Twórz obrazy favikon w wielu rozmiarach z plików PNG, JPG, WebP lub SVG.",
  },
  "qr-code-generator": {
    title: "Generator kodów QR",
    description: "Twórz kody QR z adresów URL, tekstu i innych informacji natychmiast.",
  },
  "unit-converter": {
    title: "Konwerter jednostek",
    description:
      "Natychmiast konwertuj jednostki długości, masy i temperatury za pomocą prostego konwertera online.",
  },
  "percentage-calculator": {
    title: "Kalkulator procentowy",
    description: "Obliczaj procent dowolnej liczby szybko i łatwo.",
  },
  "case-converter": {
    title: "Konwerter wielkości liter",
    description:
      "Natychmiast zmieniaj tekst na wielkie, małe litery, format tytułu lub zdania.",
  },
  "character-counter": {
    title: "Licznik znaków",
    description: "Natychmiast licz znaki, spacje, słowa, zdania i akapity.",
  },
  "word-counter": {
    title: "Licznik słów",
    description: "Natychmiast licz słowa, znaki, zdania, akapity i wiersze.",
  },
  "heic-to-jpg": {
    title: "HEIC na JPG",
    description: "Konwertuj obrazy HEIC i HEIF na JPG online za darmo.",
  },
  "compress-image-to-kb": {
    title: "Kompresuj obraz do KB",
    description:
      "Kompresuj obrazy do 20KB, 50KB, 100KB, 200KB lub niestandardowego rozmiaru.",
  },
  "image-to-text": {
    title: "Obraz na tekst",
    description:
      "Wyodrębniaj tekst z JPG, PNG, WebP i innych obrazów za pomocą OCR w przeglądarce.",
  },
  converter: {
    title: "Konwerter obrazów",
    description: "Konwertuj JPG, PNG, WebP i inne popularne formaty obrazów.",
  },
  resizer: {
    title: "Zmiana rozmiaru obrazów",
    description: "Zmień rozmiar obrazów do dokładnych wymiarów w kilka sekund.",
  },
  cropper: {
    title: "Przycinanie obrazów",
    description: "Szybko przycinaj obrazy z dokładnymi wymiarami.",
  },
  "image-to-pdf": {
    title: "Obraz na PDF",
    description: "Zamień jeden lub kilka obrazów w dokument PDF.",
  },
  "webp-converter": {
    title: "Konwerter WebP",
    description: "Konwertuj obrazy do szybkiego i wydajnego formatu WebP.",
  },
  rotator: {
    title: "Obrót obrazów",
    description: "Obracaj i prostuj obrazy z łatwością.",
  },
  enhancer: {
    title: "Poprawa jakości obrazów",
    description: "Popraw wyrazistość i jakość wizualną obrazu.",
  },
  "background-remover": {
    title: "Usuwanie tła",
    description:
      "Usuń tło obrazów i zastąp je profesjonalnymi kolorami.",
  },
  "image-metadata": {
    title: "Narzędzie metadanych obrazu",
    description:
      "Przeglądaj metadane, sprawdzaj informacje EXIF, usuwaj metadane i pobieraj czysty obraz.",
  },
  "passport-photo": {
    title: "Zdjęcie w rozmiarze paszportowym",
    description:
      "Twórz zdjęcia w standardowym rozmiarze paszportowym i arkusze zdjęć do wydruku.",
  },
  "batch-converter": {
    title: "Konwerter wsadowy",
    description: "Przetwarzaj wiele obrazów razem w jednym przepływie pracy.",
  },
  "image-to-word": {
    title: "Obraz na Word",
    description: "Konwertuj jeden lub kilka obrazów na dokument Word.",
  },
  "word-to-image": {
    title: "Word na obraz",
    description: "Szybko konwertuj dokument Word na obraz.",
  },
  "pdf-merger": {
    title: "Scal PDF",
    description: "Połącz wiele plików PDF w jeden dokument.",
  },
  "pdf-splitter": {
    title: "Podziel PDF",
    description: "Podziel PDF na osobne dokumenty szybko i łatwo.",
  },
  "pdf-compressor": {
    title: "Kompresuj PDF",
    description:
      "Zmniejsz rozmiar pliku PDF, zachowując dokumenty łatwe w użyciu.",
  },
  "pdf-to-word": {
    title: "PDF na Word",
    description: "Konwertuj pliki PDF na edytowalne dokumenty Word.",
  },
  "pdf-to-powerpoint": {
    title: "PDF na PowerPoint",
    description: "Konwertuj pliki PDF na prezentacje PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF na Excel",
    description: "Konwertuj pliki PDF na arkusze kalkulacyjne Excel.",
  },
  "word-to-pdf": {
    title: "Word na PDF",
    description: "Konwertuj dokumenty Word na pliki PDF.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint na PDF",
    description: "Konwertuj prezentacje PowerPoint na pliki PDF.",
  },
  "excel-to-pdf": {
    title: "Excel na PDF",
    description: "Konwertuj arkusze kalkulacyjne Excel na pliki PDF.",
  },
  "pdf-editor": {
    title: "Edytor PDF",
    description: "Dodawaj tekst do stron PDF i edytuj swoje dokumenty.",
  },
  "pdf-to-jpg": {
    title: "PDF na JPG",
    description: "Konwertuj strony PDF na obrazy JPG.",
  },
  "pdf-signer": {
    title: "Podpisz PDF",
    description: "Dodaj swój podpis do dokumentów PDF.",
  },
  "pdf-watermark": {
    title: "Znak wodny PDF",
    description: "Dodaj niestandardowy znak wodny do każdej strony PDF.",
  },
  "pdf-rotator": {
    title: "Obróć PDF",
    description: "Obracaj strony PDF do właściwej orientacji.",
  },
  "html-to-pdf": {
    title: "HTML na PDF",
    description: "Konwertuj zawartość HTML na dokument PDF.",
  },
  "pdf-unlocker": {
    title: "Odblokuj PDF",
    description:
      "Usuń ograniczenia PDF z dokumentów, które masz prawo edytować.",
  },
  "pdf-protector": {
    title: "Chroń PDF",
    description: "Dodaj ustawienia ochrony do swoich dokumentów PDF.",
  },
  "pdf-organizer": {
    title: "Organizuj PDF",
    description: "Zmieniaj kolejność, organizuj i łącz pliki PDF.",
  },
  "pdf-to-pdfa": {
    title: "PDF na PDF/A",
    description: "Przygotuj dokumenty PDF do długoterminowej archiwizacji.",
  },
  "pdf-repair": {
    title: "Napraw PDF",
    description:
      "Spróbuj naprawić pliki PDF z drobnymi problemami strukturalnymi.",
  },
  "pdf-page-numbers": {
    title: "Dodaj numery stron PDF",
    description: "Dodaj numery stron do swoich dokumentów PDF.",
  },
  "scan-to-pdf": {
    title: "Skanuj do PDF",
    description: "Konwertuj zeskanowane obrazy na dokument PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Wyodrębniaj przeszukiwalny tekst z zeskanowanych dokumentów PDF.",
  },
  "pdf-comparer": {
    title: "Porównaj PDF",
    description: "Porównaj dwa dokumenty PDF i znajdź podstawowe różnice.",
  },
  "pdf-redactor": {
    title: "Redaguj PDF",
    description: "Ukryj poufne informacje w dokumentach PDF.",
  },
  "pdf-cropper": {
    title: "Przytnij PDF",
    description: "Przytnij strony PDF i usuń niechciane marginesy.",
  },
  "pdf-forms": {
    title: "Formularze PDF",
    description:
      "Wypełniaj pola formularzy PDF i dodawaj informacje do dokumentów.",
  },
  "pdf-summarizer": {
    title: "Streszczacz PDF",
    description: "Streszczaj dokumenty PDF i poznaj najważniejszą treść.",
  },
  "pdf-translator": {
    title: "Tłumacz PDF",
    description: "Tłumacz dokumenty PDF na preferowany język.",
  },
  "pdf-to-markdown": {
    title: "PDF na Markdown",
    description: "Konwertuj dokumenty PDF na pliki Markdown.",
  },
  "social-qr-card": {
    title: "Karta QR mediów społecznościowych",
    description:
      "Utwórz jeden kod QR dla WhatsApp, Instagram, Facebook, X, YouTube i innych linków społecznościowych.",
  },
  "video-to-link": {
    title: "Wideo → Link",
    description:
      "Prześlij wideo i utwórz link do udostępniania z czasem wygaśnięcia.",
  },
  "bulk-sms": {
    title: "Masowa wiadomość SMS",
    description:
      "Spersonalizuj jedną wiadomość SMS dla każdego kontaktu, zweryfikuj numery telefonów i skopiuj lub eksportuj listę.",
  },
  "bulk-email": {
    title: "Masowy e-mail",
    description:
      "Spersonalizuj jednego e-maila dla każdego kontaktu, zweryfikuj adresy e-mail i skopiuj lub eksportuj listę.",
  },
  "audio-to-text": {
    title: "Audio na tekst",
    description:
      "Zamień nagrania audio w edytowalny tekst z prywatną transkrypcją w przeglądarce. Plik audio nigdy nie jest wysyłany.",
  },
};

const toolTextSv: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Fraktetikett & faktura PDF",
    description:
      "Passar fraktetiketter och fakturur från vilket PDF som helst på exakta 4×6-, 100×150 mm- eller anpassade utryckssidor — utan töjning eller beskärning.",
  },
  compressor: {
    title: "Bildkomprimerare",
    description:
      "Minska filstorleken för bilder och behåll utmärkt kvalitet.",
  },
  "favicon-generator": {
    title: "Favicongenerator",
    description:
      "Skapa favicon-bilder i flera storlekar från PNG-, JPG-, WebP- eller SVG-filer.",
  },
  "qr-code-generator": {
    title: "QR-kodgenerator",
    description:
      "Skapa QR-koder från URL:er, text och annan information direkt.",
  },
  "unit-converter": {
    title: "Enhetsomvandlare",
    description:
      "Omvandla längd-, vikt- och temperaturenheter direkt med en enkel online-omvandlare.",
  },
  "percentage-calculator": {
    title: "Procenträknare",
    description: "Beräkna snabbt och enkelt en procent av vilket tal som helst.",
  },
  "case-converter": {
    title: "Omvandlare för versaler/gemener",
    description:
      "Omvandla text till versaler, gemener, rubrikskiftet eller meningsskrift omedelbart.",
  },
  "character-counter": {
    title: "Teckenräknare",
    description:
      "Räkna tecken, mellanslag, ord, meningar och stycken omedelbart.",
  },
  "word-counter": {
    title: "Ordräknare",
    description:
      "Räkna ord, tecken, meningar, stycken och rader omedelbart.",
  },
  "heic-to-jpg": {
    title: "HEIC till JPG",
    description: "Konvertera HEIC- och HEIF-bilder till JPG online gratis.",
  },
  "compress-image-to-kb": {
    title: "Komprimera bild till KB",
    description:
      "Komprimera bilder till 20KB, 50KB, 100KB, 200KB eller en anpassad storlek.",
  },
  "image-to-text": {
    title: "Bild till text",
    description:
      "Extrahera text från JPG, PNG, WebP och andra bilder med OCR i webbläsaren.",
  },
  converter: {
    title: "Bildkonverterare",
    description:
      "Konvertera JPG, PNG, WebP och andra populära bildformat.",
  },
  resizer: {
    title: "Ändra bildstorlek",
    description: "Ändra snabbt storleken på bilder till exakta mått på några sekunder.",
  },
  cropper: {
    title: "Beskära bilder",
    description: "Beskär snabbt dina bilder med exakta mått.",
  },
  "image-to-pdf": {
    title: "Bild till PDF",
    description: "Gör en eller flera bilder till ett PDF-dokument.",
  },
  "webp-converter": {
    title: "WebP-konverterare",
    description: "Konvertera bilder till det snabba och effektiva WebP-formatet.",
  },
  rotator: {
    title: "Rotera bilder",
    description: "Rotera och räta till dina bilder enkelt.",
  },
  enhancer: {
    title: "Bildförbättrare",
    description: "Förbättra bildens skärpa och visuella kvalitet.",
  },
  "background-remover": {
    title: "Ta bort bakgrund",
    description:
      "Ta bort bakgrunder från bilder och ersätt med professionella färger.",
  },
  "image-metadata": {
    title: "Verktyg för bildmetadata",
    description:
      "Visa bildmetadata, granska EXIF-information, ta bort metadata och ladda ner en ren bild.",
  },
  "passport-photo": {
    title: "Passfoto",
    description:
      "Skapa foton i standardmässig passstorlek och utskrivbara fotoblad.",
  },
  "batch-converter": {
    title: "Batchkonverterare",
    description: "Bearbeta flera bilder tillsammans i ett enda arbetsflöde.",
  },
  "image-to-word": {
    title: "Bild till Word",
    description: "Konvertera en eller flera bilder till ett Word-dokument.",
  },
  "word-to-image": {
    title: "Word till bild",
    description: "Konvertera snabbt ditt Word-dokument till en bild.",
  },
  "pdf-merger": {
    title: "Slå samman PDF",
    description: "Slå samman flera PDF-filer till ett dokument.",
  },
  "pdf-splitter": {
    title: "Dela PDF",
    description: "Dela en PDF i separata dokument snabbt och enkelt.",
  },
  "pdf-compressor": {
    title: "Komprimera PDF",
    description:
      "Minska storleken på PDF-filen samtidigt som dokumenten förblir användbara.",
  },
  "pdf-to-word": {
    title: "PDF till Word",
    description: "Konvertera PDF-filer till redigerbara Word-dokument.",
  },
  "pdf-to-powerpoint": {
    title: "PDF till PowerPoint",
    description: "Konvertera PDF-filer till PowerPoint-presentationer.",
  },
  "pdf-to-excel": {
    title: "PDF till Excel",
    description: "Konvertera PDF-filer till Excel-kalkylblad.",
  },
  "word-to-pdf": {
    title: "Word till PDF",
    description: "Konvertera Word-dokument till PDF-filer.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint till PDF",
    description: "Konvertera PowerPoint-presentationer till PDF-filer.",
  },
  "excel-to-pdf": {
    title: "Excel till PDF",
    description: "Konvertera Excel-kalkylblad till PDF-filer.",
  },
  "pdf-editor": {
    title: "PDF-redigerare",
    description: "Lägg till text på dina PDF-sidor och redigera dokumenten.",
  },
  "pdf-to-jpg": {
    title: "PDF till JPG",
    description: "Konvertera PDF-sidor till JPG-bilder.",
  },
  "pdf-signer": {
    title: "Signera PDF",
    description: "Lägg till din signatur på PDF-dokumenten.",
  },
  "pdf-watermark": {
    title: "PDF-vattenstämpel",
    description: "Lägg till en anpassad vattenstämpel på varje sida av din PDF.",
  },
  "pdf-rotator": {
    title: "Rotera PDF",
    description: "Rotera PDF-sidor till korrekt orientering.",
  },
  "html-to-pdf": {
    title: "HTML till PDF",
    description: "Konvertera HTML-innehåll till ett PDF-dokument.",
  },
  "pdf-unlocker": {
    title: "Lås upp PDF",
    description:
      "Ta bort PDF-begränsningar från dokument som du har behörighet att redigera.",
  },
  "pdf-protector": {
    title: "Skydda PDF",
    description: "Lägg till skyddsinställningar i dina PDF-dokument.",
  },
  "pdf-organizer": {
    title: "Organisera PDF",
    description: "Ordna om, organisera och slå samman PDF-filer.",
  },
  "pdf-to-pdfa": {
    title: "PDF till PDF/A",
    description: "Förbered PDF-dokument för långtidsarkivering.",
  },
  "pdf-repair": {
    title: "Reparera PDF",
    description: "Försök att reparera PDF-filer med mindre strukturella problem.",
  },
  "pdf-page-numbers": {
    title: "Lägg till sidnummer i PDF",
    description: "Lägg till sidnummer i dina PDF-dokument.",
  },
  "scan-to-pdf": {
    title: "Skanna till PDF",
    description: "Konvertera skannade bilder till ett PDF-dokument.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Extrahera sökbar text från skannade PDF-dokument.",
  },
  "pdf-comparer": {
    title: "Jämför PDF",
    description: "Jämför två PDF-dokument och identifiera grundläggande skillnader.",
  },
  "pdf-redactor": {
    title: "Maska PDF",
    description: "Dölj känslig information i PDF-dokument.",
  },
  "pdf-cropper": {
    title: "Beskär PDF",
    description: "Beskär PDF-sidor och ta bort oönskade marginaler.",
  },
  "pdf-forms": {
    title: "PDF-formulär",
    description:
      "Fyll i PDF-formulärfält och lägg till information i dokumenten.",
  },
  "pdf-summarizer": {
    title: "PDF-sammanfattare",
    description: "Sammanfatta PDF-dokument och förstå nyckelinnehållet.",
  },
  "pdf-translator": {
    title: "PDF-översättare",
    description: "Översätt PDF-dokument till ditt önskade språk.",
  },
  "pdf-to-markdown": {
    title: "PDF till Markdown",
    description: "Konvertera PDF-dokument till Markdown-filer.",
  },
  "social-qr-card": {
    title: "QR-kort för sociala medier",
    description:
      "Skapa en enda QR-kod för WhatsApp, Instagram, Facebook, X, YouTube och andra sociala länkar.",
  },
  "video-to-link": {
    title: "Video → Länk",
    description: "Ladda upp en video och skapa en delbar länk med en utgångstid.",
  },
  "bulk-sms": {
    title: "Mass-SMS",
    description:
      "Anpassa ett SMS-meddelande för varje kontakt, validera telefonnumren och kopiera eller exportera listan.",
  },
  "bulk-email": {
    title: "Mass-e-post",
    description:
      "Anpassa ett e-postmeddelande för varje kontakt, validera e-postadresserna och kopiera eller exportera listan.",
  },
  "audio-to-text": {
    title: "Ljud till text",
    description:
      "Gör ljudinspelningar till redigerbar text med privat transkription i webbläsaren. Din ljudfil laddas aldrig upp.",
  },
};

const toolTextTh: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "ป้ายจัดสาร และแบิงใจนี PDF",
    description:
      "ตัวป้ายจัดสารและแบิงใจนีจาก PDF หากค่ะแพบพิเศษ 4×6, 100×150 มม. หรือค้ารับ และตัดที่มา",
  },
  compressor: {
    title: "เครื่องบีบอัดรูปภาพ",
    description: "ลดขนาดไฟล์รูปภาพพร้อมคงคุณภาพที่ยอดเยี่ยม",
  },
  "favicon-generator": {
    title: "ตัวสร้าง Favicon",
    description: "สร้างรูปภาพ favicon หลายขนาดจากไฟล์ PNG, JPG, WebP หรือ SVG",
  },
  "qr-code-generator": {
    title: "ตัวสร้างรหัส QR",
    description: "สร้างรหัส QR จาก URL ข้อความ และข้อมูลอื่นได้ทันที",
  },
  "unit-converter": {
    title: "ตัวแปลงหน่วย",
    description: "แปลงหน่วยความยาว น้ำหนัก และอุณหภูมิได้ทันทีด้วยตัวแปลงออนไลน์ง่ายๆ",
  },
  "percentage-calculator": {
    title: "เครื่องคิดเลขเปอร์เซ็นต์",
    description: "คำนวณเปอร์เซ็นต์ของตัวเลขใดๆ ได้อย่างรวดเร็วและง่ายดาย",
  },
  "case-converter": {
    title: "ตัวแปลงตัวพิมพ์",
    description: "แปลงข้อความให้เป็นตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวพิมพ์ชื่อเรื่อง หรือแบบประโยคได้ทันที",
  },
  "character-counter": {
    title: "ตัวนับอักขระ",
    description: "นับอักขระ ช่องว่าง คำ ประโยค และย่อหน้าได้ทันที",
  },
  "word-counter": {
    title: "ตัวนับคำ",
    description: "นับคำ อักขระ ประโยค ย่อหน้า และบรรทัดได้ทันที",
  },
  "heic-to-jpg": {
    title: "HEIC เป็น JPG",
    description: "แปลงรูปภาพ HEIC และ HEIF เป็น JPG ออนไลน์ฟรี",
  },
  "compress-image-to-kb": {
    title: "บีบอัดรูปภาพเป็น KB",
    description: "บีบอัดรูปภาพเป็น 20KB, 50KB, 100KB, 200KB หรือขนาดที่กำหนดเอง",
  },
  "image-to-text": {
    title: "รูปภาพเป็นข้อความ",
    description: "แยกข้อความจาก JPG, PNG, WebP และรูปภาพอื่นๆ ด้วย OCR บนเบราว์เซอร์",
  },
  converter: {
    title: "ตัวแปลงรูปภาพ",
    description: "แปลง JPG, PNG, WebP และรูปแบบรูปภาพยอดนิยมอื่นๆ",
  },
  resizer: {
    title: "ตัวปรับขนาดรูปภาพ",
    description: "ปรับขนาดรูปภาพให้เป็นขนาดที่ต้องการภายในไม่กี่วินาที",
  },
  cropper: {
    title: "ตัวครอบตัดรูปภาพ",
    description: "ครอบตัดรูปภาพได้อย่างรวดเร็วด้วยมิติที่แม่นยำ",
  },
  "image-to-pdf": {
    title: "รูปภาพเป็น PDF",
    description: "เปลี่ยนรูปภาพหนึ่งหรือหลายภาพเป็นเอกสาร PDF",
  },
  "webp-converter": {
    title: "ตัวแปลง WebP",
    description: "แปลงรูปภาพเป็นรูปแบบ WebP ที่รวดเร็วและมีประสิทธิภาพ",
  },
  rotator: {
    title: "ตัวหมุนรูปภาพ",
    description: "หมุนและปรับรูปภาพให้ตรงได้อย่างง่ายดาย",
  },
  enhancer: {
    title: "ตัวปรับปรุงรูปภาพ",
    description: "ปรับปรุงความคมชัดและคุณภาพของรูปภาพ",
  },
  "background-remover": {
    title: "ตัวลบพื้นหลัง",
    description: "ลบพื้นหลังของรูปภาพและแทนที่ด้วยสีระดับมืออาชีพ",
  },
  "image-metadata": {
    title: "เครื่องมือเมตาดาต้ารูปภาพ",
    description: "ดูเมตาดาต้าของรูปภาพ ตรวจสอบข้อมูล EXIF ลบเมตาดาต้าและดาวน์โหลดรูปภาพที่สะอาด",
  },
  "passport-photo": {
    title: "ภาพถ่ายขนาดพาสปอร์ต",
    description: "สร้างภาพถ่ายขนาดพาสปอร์ตมาตรฐานและแผ่นภาพถ่ายที่พิมพ์ได้",
  },
  "batch-converter": {
    title: "ตัวแปลงแบบกลุ่ม",
    description: "ประมวลผลหลายรูปภาพร่วมกันในเวิร์กโฟลว์เดียว",
  },
  "image-to-word": {
    title: "รูปภาพเป็น Word",
    description: "แปลงรูปภาพหนึ่งหรือหลายภาพเป็นเอกสาร Word",
  },
  "word-to-image": {
    title: "Word เป็นรูปภาพ",
    description: "แปลงเอกสาร Word ของคุณเป็นรูปภาพอย่างรวดเร็ว",
  },
  "pdf-merger": {
    title: "รวม PDF",
    description: "รวมไฟล์ PDF หลายไฟล์เป็นเอกสารเดียว",
  },
  "pdf-splitter": {
    title: "แยก PDF",
    description: "แยก PDF เป็นเอกสารแยกอย่างรวดเร็วและง่ายดาย",
  },
  "pdf-compressor": {
    title: "บีบอัด PDF",
    description: "ลดขนาดไฟล์ PDF ในขณะที่ยังคงให้เอกสารใช้งานได้ง่าย",
  },
  "pdf-to-word": {
    title: "PDF เป็น Word",
    description: "แปลงไฟล์ PDF เป็นเอกสาร Word ที่แก้ไขได้",
  },
  "pdf-to-powerpoint": {
    title: "PDF เป็น PowerPoint",
    description: "แปลงไฟล์ PDF เป็นงานนำเสนอ PowerPoint",
  },
  "pdf-to-excel": {
    title: "PDF เป็น Excel",
    description: "แปลงไฟล์ PDF เป็นสเปรดชีต Excel",
  },
  "word-to-pdf": {
    title: "Word เป็น PDF",
    description: "แปลงเอกสาร Word เป็นไฟล์ PDF",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint เป็น PDF",
    description: "แปลงงานนำเสนอ PowerPoint เป็นไฟล์ PDF",
  },
  "excel-to-pdf": {
    title: "Excel เป็น PDF",
    description: "แปลงสเปรดชีต Excel เป็นไฟล์ PDF",
  },
  "pdf-editor": {
    title: "ตัวแก้ไข PDF",
    description: "เพิ่มข้อความลงในหน้า PDF และแก้ไขเอกสารของคุณ",
  },
  "pdf-to-jpg": {
    title: "PDF เป็น JPG",
    description: "แปลงหน้า PDF เป็นรูปภาพ JPG",
  },
  "pdf-signer": {
    title: "ลงชื่อ PDF",
    description: "เพิ่มลายเซ็นของคุณลงในเอกสาร PDF",
  },
  "pdf-watermark": {
    title: "ลายน้ำ PDF",
    description: "เพิ่มลายน้ำแบบกำหนดเองลงในทุกหน้าของ PDF",
  },
  "pdf-rotator": {
    title: "หมุน PDF",
    description: "หมุนหน้า PDF ไปในทิศทางที่ถูกต้อง",
  },
  "html-to-pdf": {
    title: "HTML เป็น PDF",
    description: "แปลงเนื้อหา HTML เป็นเอกสาร PDF",
  },
  "pdf-unlocker": {
    title: "ปลดล็อก PDF",
    description: "ลบข้อจำกัด PDF ออกจากเอกสารที่คุณมีสิทธิ์แก้ไข",
  },
  "pdf-protector": {
    title: "ป้องกัน PDF",
    description: "เพิ่มการตั้งค่าการป้องกันลงในเอกสาร PDF ของคุณ",
  },
  "pdf-organizer": {
    title: "จัดระเบียบ PDF",
    description: "จัดเรียง จัดระเบียบ และรวมไฟล์ PDF",
  },
  "pdf-to-pdfa": {
    title: "PDF เป็น PDF/A",
    description: "เตรียมเอกสาร PDF สำหรับการเก็บถาวรระยะยาว",
  },
  "pdf-repair": {
    title: "ซ่อมแซม PDF",
    description: "ลองซ่อมแซมไฟล์ PDF ที่มีปัญหาทางโครงสร้างเล็กน้อย",
  },
  "pdf-page-numbers": {
    title: "เพิ่มเลขหน้า PDF",
    description: "เพิ่มเลขหน้าลงในเอกสาร PDF ของคุณ",
  },
  "scan-to-pdf": {
    title: "สแกนเป็น PDF",
    description: "แปลงรูปภาพที่สแกนเป็นเอกสาร PDF",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "แยกข้อความที่ค้นหาได้จากเอกสาร PDF ที่สแกน",
  },
  "pdf-comparer": {
    title: "เปรียบเทียบ PDF",
    description: "เปรียบเทียบเอกสาร PDF สองฉบับและระบุความแตกต่างพื้นฐาน",
  },
  "pdf-redactor": {
    title: "ปิดบัง PDF",
    description: "ซ่อนข้อมูลที่ละเอียดอ่อนในเอกสาร PDF",
  },
  "pdf-cropper": {
    title: "ครอบตัด PDF",
    description: "ครอบตัดหน้า PDF และลบระยะขอบที่ไม่ต้องการ",
  },
  "pdf-forms": {
    title: "แบบฟอร์ม PDF",
    description: "กรอกช่องแบบฟอร์ม PDF และเพิ่มข้อมูลลงในเอกสาร",
  },
  "pdf-summarizer": {
    title: "สรุป PDF",
    description: "สรุปเอกสาร PDF และเข้าใจเนื้อหาหลัก",
  },
  "pdf-translator": {
    title: "โปรแกรมแปล PDF",
    description: "แปลเอกสาร PDF เป็นภาษาที่คุณต้องการ",
  },
  "pdf-to-markdown": {
    title: "PDF เป็น Markdown",
    description: "แปลงเอกสาร PDF เป็นไฟล์ Markdown",
  },
  "social-qr-card": {
    title: "การ์ด QR โซเชียลมีเดีย",
    description: "สร้างรหัส QR เดียวสำหรับ WhatsApp, Instagram, Facebook, X, YouTube และลิงก์โซเชียลอื่นๆ",
  },
  "video-to-link": {
    title: "วิดีโอ → ลิงก์",
    description: "อัปโหลดวิดีโอและสร้างลิงก์แชร์ที่มีเวลาหมดอายุ",
  },
  "bulk-sms": {
    title: "สร้าง SMS จำนวนมาก",
    description:
      "ปรับแต่งข้อความ SMS สำหรับผู้ติดต่อแต่ละราย ตรวจสอบหมายเลขโทรศัพท์ แล้วคัดลอกหรือส่งออกรายการ",
  },
  "bulk-email": {
    title: "สร้างอีเมลจำนวนมาก",
    description:
      "ปรับแต่งอีเมลสำหรับผู้ติดต่อแต่ละราย ตรวจสอบที่อยู่อีเมล แล้วคัดลอกหรือส่งออกรายการ",
  },
  "audio-to-text": {
    title: "เปลี่ยนเสียงเป็นข้อความ",
    description:
      "แปลงไฟล์เสียงเป็นข้อความที่แก้ไขได้ ด้วยการถอดความภายในเบราว์เซอร์ ไฟล์เสียงของคุณจะไม่ถูกอัปโหลด",
  },
};

const toolTextTr: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Kargo etiketi ve fatura PDF",
    description:
      "Herhangi bir PDF'teki kargo etiketlerini ve faturaları tam 4×6, 100×150 mm veya özel baskı sayfalarına sığırın — germe veya kesme yok.",
  },
  compressor: {
    title: "Görsel Sıkıştırıcı",
    description: "Mükemmel kaliteyi korurken görüntü dosyası boyutunu küçült.",
  },
  "favicon-generator": {
    title: "Favicon Oluşturucu",
    description:
      "PNG, JPG, WebP veya SVG dosyalarından çeşitli boyutlarda favicon görselleri oluştur.",
  },
  "qr-code-generator": {
    title: "QR Kod Oluşturucu",
    description:
      "URL'lerden, metinlerden ve diğer bilgilerden anında QR kod oluştur.",
  },
  "unit-converter": {
    title: "Birim Dönüştürücü",
    description:
      "Basit bir çevrimiçi dönüştürücüyle uzunluk, ağırlık ve sıcaklık birimlerini anında dönüştür.",
  },
  "percentage-calculator": {
    title: "Yüzde Hesaplayıcı",
    description: "Herhangi bir sayının yüzdesini hızlı ve kolay şekilde hesapla.",
  },
  "case-converter": {
    title: "Büyük/Küçük Harf Dönüştürücü",
    description:
      "Metni büyük harf, küçük harf, başlık biçimi veya cümle biçimine anında dönüştür.",
  },
  "character-counter": {
    title: "Karakter Sayacı",
    description:
      "Karakterleri, boşlukları, kelimeleri, cümleleri ve paragrafları anında say.",
  },
  "word-counter": {
    title: "Kelime Sayacı",
    description:
      "Kelimeleri, karakterleri, cümleleri, paragrafları ve satırları anında say.",
  },
  "heic-to-jpg": {
    title: "HEIC'ten JPG'ye",
    description: "HEIC ve HEIF görüntülerini çevrimiçi ücretsiz JPG'ye dönüştür.",
  },
  "compress-image-to-kb": {
    title: "Görseli KB'ye Sıkıştır",
    description:
      "Görselleri 20KB, 50KB, 100KB, 200KB veya özel boyuta sıkıştır.",
  },
  "image-to-text": {
    title: "Görselden Metne",
    description:
      "Tarayıcı tabanlı OCR ile JPG, PNG, WebP ve diğer görsellerden metin çıkar.",
  },
  converter: {
    title: "Görsel Dönüştürücü",
    description: "JPG, PNG, WebP ve diğer popüler görüntü formatlarını dönüştür.",
  },
  resizer: {
    title: "Görsel Boyutlandırıcı",
    description: "Görselleri saniyeler içinde tam boyutlara yeniden boyutlandır.",
  },
  cropper: {
    title: "Görsel Kırpıcı",
    description: "Görselleri hassas boyutlarla hızlıca kırp.",
  },
  "image-to-pdf": {
    title: "Görselden PDF'e",
    description: "Bir veya birden fazla görseli PDF belgesine dönüştür.",
  },
  "webp-converter": {
    title: "WebP Dönüştürücü",
    description: "Görselleri hızlı ve verimli WebP formatına dönüştür.",
  },
  rotator: {
    title: "Görsel Döndürücü",
    description: "Görselleri kolayca döndür ve düzelt.",
  },
  enhancer: {
    title: "Görsel İyileştirici",
    description: "Görsel netliğini ve görsel kaliteyi geliştir.",
  },
  "background-remover": {
    title: "Arka Plan Silici",
    description:
      "Görsel arka planlarını sil ve profesyonel renklerle değiştir.",
  },
  "image-metadata": {
    title: "Görsel Metadata Aracı",
    description:
      "Görsel metadata bilgilerini görüntüle, EXIF bilgilerini incele, metadata temizle ve temiz bir görsel indir.",
  },
  "passport-photo": {
    title: "Pasaport Fotoğrafı",
    description:
      "Standart pasaport boyutunda fotoğraflar ve yazdırılabilir fotoğraf sayfaları oluştur.",
  },
  "batch-converter": {
    title: "Toplu Dönüştürücü",
    description: "Birden fazla görseli tek bir iş akışında işle.",
  },
  "image-to-word": {
    title: "Görselden Word'e",
    description: "Bir veya birden fazla görseli Word belgesine dönüştür.",
  },
  "word-to-image": {
    title: "Word'den Görsele",
    description: "Word belgeni hızla görsele dönüştür.",
  },
  "pdf-merger": {
    title: "PDF Birleştir",
    description: "Birden fazla PDF dosyasını tek bir belgede birleştir.",
  },
  "pdf-splitter": {
    title: "PDF Böl",
    description: "PDF'i hızlı ve kolay ayrı belgelere böl.",
  },
  "pdf-compressor": {
    title: "PDF Sıkıştır",
    description:
      "Belgeleri kullanımı kolay tutarken PDF dosya boyutunu küçült.",
  },
  "pdf-to-word": {
    title: "PDF'ten Word'e",
    description: "PDF dosyalarını düzenlenebilir Word belgelerine dönüştür.",
  },
  "pdf-to-powerpoint": {
    title: "PDF'ten PowerPoint'e",
    description: "PDF dosyalarını PowerPoint sunumlarına dönüştür.",
  },
  "pdf-to-excel": {
    title: "PDF'ten Excel'e",
    description: "PDF dosyalarını Excel elektronik tablolarına dönüştür.",
  },
  "word-to-pdf": {
    title: "Word'den PDF'e",
    description: "Word belgelerini PDF dosyalarına dönüştür.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint'ten PDF'e",
    description: "PowerPoint sunumlarını PDF dosyalarına dönüştür.",
  },
  "excel-to-pdf": {
    title: "Excel'den PDF'e",
    description: "Excel elektronik tablolarını PDF dosyalarına dönüştür.",
  },
  "pdf-editor": {
    title: "PDF Düzenleyici",
    description: "PDF sayfalarına metin ekle ve belgeleri düzenle.",
  },
  "pdf-to-jpg": {
    title: "PDF'ten JPG'ye",
    description: "PDF sayfalarını JPG görüntülere dönüştür.",
  },
  "pdf-signer": {
    title: "PDF İmzala",
    description: "PDF belgelerine imzanı ekle.",
  },
  "pdf-watermark": {
    title: "PDF Filigran",
    description: "PDF'inin her sayfasına özel bir filigran ekle.",
  },
  "pdf-rotator": {
    title: "PDF Döndür",
    description: "PDF sayfalarını doğru yönde döndür.",
  },
  "html-to-pdf": {
    title: "HTML'den PDF'e",
    description: "HTML içeriğini PDF belgesine dönüştür.",
  },
  "pdf-unlocker": {
    title: "PDF Kilidi Aç",
    description:
      "Düzenleme yetkin olan belgelerdeki PDF kısıtlamalarını kaldır.",
  },
  "pdf-protector": {
    title: "PDF Koru",
    description: "PDF belgelerine koruma ayarları ekle.",
  },
  "pdf-organizer": {
    title: "PDF Düzenle",
    description: "PDF dosyalarını yeniden sırala, düzenle ve birleştir.",
  },
  "pdf-to-pdfa": {
    title: "PDF'ten PDF/A'ya",
    description: "PDF belgelerini uzun süreli arşivleme için hazırla.",
  },
  "pdf-repair": {
    title: "PDF Onar",
    description: "Küçük yapısal sorunları olan PDF dosyalarını onarmayı dene.",
  },
  "pdf-page-numbers": {
    title: "PDF'ye Sayfa Numarası Ekle",
    description: "PDF belgelerine sayfa numaraları ekle.",
  },
  "scan-to-pdf": {
    title: "Taramadan PDF'e",
    description: "Taranmış görüntüleri PDF belgesine dönüştür.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Taranmış PDF belgelerinden aranabilir metin çıkar.",
  },
  "pdf-comparer": {
    title: "PDF Karşılaştır",
    description: "İki PDF belgesini karşılaştır ve temel farkları belirle.",
  },
  "pdf-redactor": {
    title: "PDF Sansürle",
    description: "PDF belgelerindeki hassas bilgileri gizle.",
  },
  "pdf-cropper": {
    title: "PDF Kırp",
    description: "PDF sayfalarını kırp ve istenmeyen kenar boşluklarını sil.",
  },
  "pdf-forms": {
    title: "PDF Formları",
    description:
      "PDF form alanlarını doldur ve belgelere bilgi ekle.",
  },
  "pdf-summarizer": {
    title: "PDF Özetleyici",
    description: "PDF belgelerini özetle ve temel içeriği anla.",
  },
  "pdf-translator": {
    title: "PDF Çevirici",
    description: "PDF belgelerini tercih ettiğin dile çevir.",
  },
  "pdf-to-markdown": {
    title: "PDF'ten Markdown'a",
    description: "PDF belgelerini Markdown dosyalarına dönüştür.",
  },
  "social-qr-card": {
    title: "Sosyal Medya QR Kartı",
    description:
      "WhatsApp, Instagram, Facebook, X, YouTube ve diğer sosyal bağlantılar için tek bir QR kodu oluştur.",
  },
  "video-to-link": {
    title: "Video → Bağlantı",
    description:
      "Bir video yükle ve son kullanma süresine sahip paylaşılabilir bir bağlantı oluştur.",
  },
  "bulk-sms": {
    title: "Toplu SMS",
    description:
      "Her kişi için tek bir SMS mesajını kişiselleştirin, telefon numaralarını doğrulayın ve listeyi kopyalayın veya dışa aktarın.",
  },
  "bulk-email": {
    title: "Toplu E-posta",
    description:
      "Her kişi için tek bir e-postayı kişiselleştirin, e-posta adreslerini doğrulayın ve listeyi kopyalayın veya dışa aktarın.",
  },
  "audio-to-text": {
    title: "Sesden metne",
    description:
      "Ses kayıtlarını tarayıcıda özel bir şekilde düzenlenebilir metne dönüştürün. Ses dosyanız hiçbir yere yüklenmez.",
  },
};

const toolTextUk: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Транспортна етикета та рахунок PDF",
    description:
      "Вкладайте етикети та рахунки з будь-якого PDF у точні сторінки 4×6, 100×150 мм або власні — без розтягнення чи обрізання.",
  },
  compressor: {
    title: "Компресор зображень",
    description: "Зменшуйте розмір файлу зображення, зберігаючи чудову якість.",
  },
  "favicon-generator": {
    title: "Генератор favicon",
    description:
      "Створюйте favicon-зображення різних розмірів із файлів PNG, JPG, WebP або SVG.",
  },
  "qr-code-generator": {
    title: "Генератор QR-кодів",
    description:
      "Миттєво створюйте QR-коди з URL, тексту та іншої інформації.",
  },
  "unit-converter": {
    title: "Конвертер одиниць",
    description:
      "Миттєво конвертуйте одиниці довжини, ваги й температури за допомогою простого онлайн-конвертера.",
  },
  "percentage-calculator": {
    title: "Калькулятор відсотків",
    description: "Швидко та легко обчислюйте відсоток від будь-якого числа.",
  },
  "case-converter": {
    title: "Конвертер регістру",
    description:
      "Миттєво перетворюйте текст на великі, малі літери, титульний або реченнєвий регістр.",
  },
  "character-counter": {
    title: "Лічильник символів",
    description:
      "Миттєво рахуйте символи, пробіли, слова, речення та абзаци.",
  },
  "word-counter": {
    title: "Лічильник слів",
    description:
      "Миттєво рахуйте слова, символи, речення, абзаци та рядки.",
  },
  "heic-to-jpg": {
    title: "HEIC у JPG",
    description: "Безкоштовно конвертуйте зображення HEIC і HEIF у JPG онлайн.",
  },
  "compress-image-to-kb": {
    title: "Стиснути зображення до КБ",
    description:
      "Стискайте зображення до 20КБ, 50КБ, 100КБ, 200КБ або заданого розміру.",
  },
  "image-to-text": {
    title: "Зображення в текст",
    description:
      "Витягайте текст із JPG, PNG, WebP та інших зображень за допомогою OCR у браузері.",
  },
  converter: {
    title: "Конвертер зображень",
    description:
      "Конвертуйте JPG, PNG, WebP та інші популярні формати зображень.",
  },
  resizer: {
    title: "Зміна розміру зображень",
    description: "Змінюйте розмір зображень до точних значень за секунди.",
  },
  cropper: {
    title: "Обрізання зображень",
    description: "Швидко обрізайте зображення з точними розмірами.",
  },
  "image-to-pdf": {
    title: "Зображення у PDF",
    description: "Перетворіть одне або кілька зображень на документ PDF.",
  },
  "webp-converter": {
    title: "Конвертер WebP",
    description: "Конвертуйте зображення у швидкий та ефективний формат WebP.",
  },
  rotator: {
    title: "Поворот зображень",
    description: "Легко повертайте та вирівнюйте зображення.",
  },
  enhancer: {
    title: "Покращення зображень",
    description: "Покращуйте чіткість і візуальну якість зображень.",
  },
  "background-remover": {
    title: "Видалення фону",
    description:
      "Видаляйте фон із зображень і замінюйте його професійними кольорами.",
  },
  "image-metadata": {
    title: "Інструмент метаданих зображення",
    description:
      "Переглядайте метадані, перевіряйте інформацію EXIF, видаляйте метадані та завантажуйте чисте зображення.",
  },
  "passport-photo": {
    title: "Фото розміру паспорта",
    description:
      "Створюйте фото стандартного паспортного розміру та аркуші для друку.",
  },
  "batch-converter": {
    title: "Пакетний конвертер",
    description: "Обробляйте кілька зображень в одному робочому процесі.",
  },
  "image-to-word": {
    title: "Зображення у Word",
    description: "Перетворіть одне або кілька зображень на документ Word.",
  },
  "word-to-image": {
    title: "Word у зображення",
    description: "Швидко конвертуйте документ Word у зображення.",
  },
  "pdf-merger": {
    title: "Об'єднати PDF",
    description: "Об'єднайте кілька PDF-файлів в один документ.",
  },
  "pdf-splitter": {
    title: "Розділити PDF",
    description: "Швидко та легко розділяйте PDF на окремі документи.",
  },
  "pdf-compressor": {
    title: "Стиснути PDF",
    description:
      "Зменшуйте розмір PDF-файлу, зберігаючи документи зручними для використання.",
  },
  "pdf-to-word": {
    title: "PDF у Word",
    description: "Конвертуйте PDF-файли в редагований документ Word.",
  },
  "pdf-to-powerpoint": {
    title: "PDF у PowerPoint",
    description: "Конвертуйте PDF-файли в презентації PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF у Excel",
    description: "Конвертуйте PDF-файли в таблиці Excel.",
  },
  "word-to-pdf": {
    title: "Word у PDF",
    description: "Конвертуйте документи Word у PDF-файли.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint у PDF",
    description: "Конвертуйте презентації PowerPoint у PDF-файли.",
  },
  "excel-to-pdf": {
    title: "Excel у PDF",
    description: "Конвертуйте таблиці Excel у PDF-файли.",
  },
  "pdf-editor": {
    title: "Редактор PDF",
    description: "Додавайте текст на сторінки PDF і редагуйте документи.",
  },
  "pdf-to-jpg": {
    title: "PDF у JPG",
    description: "Конвертуйте сторінки PDF у зображення JPG.",
  },
  "pdf-signer": {
    title: "Підписати PDF",
    description: "Додавайте свій підпис у PDF-документи.",
  },
  "pdf-watermark": {
    title: "Водяний знак PDF",
    description: "Додавайте власний водяний знак на кожну сторінку PDF.",
  },
  "pdf-rotator": {
    title: "Повернути PDF",
    description: "Повертайте сторінки PDF у правильну орієнтацію.",
  },
  "html-to-pdf": {
    title: "HTML у PDF",
    description: "Конвертуйте HTML-вміст у документ PDF.",
  },
  "pdf-unlocker": {
    title: "Розблокувати PDF",
    description:
      "Знімайте обмеження PDF із документів, які ви маєте право редагувати.",
  },
  "pdf-protector": {
    title: "Захистити PDF",
    description: "Додавайте параметри захисту до PDF-документів.",
  },
  "pdf-organizer": {
    title: "Організувати PDF",
    description: "Змінюйте порядок, організовуйте та об'єднуйте PDF-файли.",
  },
  "pdf-to-pdfa": {
    title: "PDF у PDF/A",
    description: "Готуйте PDF-документи до довготривалого архівування.",
  },
  "pdf-repair": {
    title: "Відновити PDF",
    description: "Спробуйте відновити PDF-файли з незначними структурними проблемами.",
  },
  "pdf-page-numbers": {
    title: "Додати номери сторінок PDF",
    description: "Додавайте номери сторінок до PDF-документів.",
  },
  "scan-to-pdf": {
    title: "Сканування у PDF",
    description: "Перетворюйте відскановані зображення на документ PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Витягайте доступний для пошуку текст із відсканованих PDF-документів.",
  },
  "pdf-comparer": {
    title: "Порівняти PDF",
    description: "Порівнюйте два PDF-документи та знаходьте основні відмінності.",
  },
  "pdf-redactor": {
    title: "Замаскувати PDF",
    description: "Приховуйте конфіденційну інформацію в PDF-документах.",
  },
  "pdf-cropper": {
    title: "Обрізати PDF",
    description: "Обрізайте сторінки PDF і видаляйте небажані поля.",
  },
  "pdf-forms": {
    title: "Форми PDF",
    description:
      "Заповнюйте поля форм PDF і додавайте інформацію до документів.",
  },
  "pdf-summarizer": {
    title: "Резюме PDF",
    description: "Створюйте резюме PDF-документів і розумійте ключовий вміст.",
  },
  "pdf-translator": {
    title: "Перекладач PDF",
    description: "Перекладайте PDF-документи вашою улюбленою мовою.",
  },
  "pdf-to-markdown": {
    title: "PDF у Markdown",
    description: "Конвертуйте PDF-документи у файли Markdown.",
  },
  "social-qr-card": {
    title: "QR-картка для соцмереж",
    description:
      "Створіть один QR-код для WhatsApp, Instagram, Facebook, X, YouTube та інших соцмереж.",
  },
  "video-to-link": {
    title: "Відео → посилання",
    description: "Завантажте відео та створіть посилання для надсилання зі строком дії.",
  },
  "bulk-sms": {
    title: "Масова розсилка SMS",
    description:
      "Персоналізуйте SMS для кожного контакту, перевірте номери телефонів та скопіюйте або експортуйте список.",
  },
  "bulk-email": {
    title: "Масова розсилка листів",
    description:
      "Персоналізуйте лист для кожного контакту, перевірте адреси електронної пошти та скопіюйте або експортуйте список.",
  },
  "audio-to-text": {
    title: "Аудіо в текст",
    description:
      "Перетворюйте аудіозаписи на редагований текст із приватною транскрипцією в браузері. Аудіофайл нікуди не завантажується.",
  },
};

const toolTextVi: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Nhãn vận chuyển & hóa đơn PDF",
    description:
      "Vừa khít nhãn vận chuyển và hóa đơn từ mọi PDF vào trang in đúng kích thước 4×6, 100×150 mm hoặc tùy chỉnh — không kêo dài, không cắt bỏ.",
  },
  compressor: {
    title: "Công cụ nén ảnh",
    description: "Giảm kích thước tệp ảnh trong khi vẫn giữ chất lượng tuyệt vời.",
  },
  "favicon-generator": {
    title: "Trình tạo favicon",
    description:
      "Tạo hình ảnh favicon với nhiều kích cỡ từ tệp PNG, JPG, WebP hoặc SVG.",
  },
  "qr-code-generator": {
    title: "Trình tạo mã QR",
    description: "Tạo mã QR từ URL, văn bản và thông tin khác ngay lập tức.",
  },
  "unit-converter": {
    title: "Bộ chuyển đổi đơn vị",
    description:
      "Chuyển đổi đơn vị độ dài, khối lượng và nhiệt độ ngay lập tức bằng bộ chuyển đổi trực tuyến đơn giản.",
  },
  "percentage-calculator": {
    title: "Máy tính phần trăm",
    description: "Tính phần trăm của bất kỳ con số nào một cách nhanh chóng và dễ dàng.",
  },
  "case-converter": {
    title: "Bộ chuyển đổi chữ hoa/thường",
    description:
      "Chuyển văn bản thành chữ hoa, chữ thường, kiểu tiêu đề hoặc kiểu câu ngay lập tức.",
  },
  "character-counter": {
    title: "Bộ đếm ký tự",
    description:
      "Đếm ký tự, dấu cách, từ, câu và đoạn văn ngay lập tức.",
  },
  "word-counter": {
    title: "Bộ đếm từ",
    description:
      "Đếm từ, ký tự, câu, đoạn văn và dòng ngay lập tức.",
  },
  "heic-to-jpg": {
    title: "HEIC sang JPG",
    description: "Chuyển ảnh HEIC và HEIF sang JPG trực tuyến miễn phí.",
  },
  "compress-image-to-kb": {
    title: "Nén ảnh thành KB",
    description:
      "Nén ảnh thành 20KB, 50KB, 100KB, 200KB hoặc kích thước tùy chỉnh.",
  },
  "image-to-text": {
    title: "Ảnh sang văn bản",
    description:
      "Trích xuất văn bản từ JPG, PNG, WebP và các ảnh khác bằng OCR trên trình duyệt.",
  },
  converter: {
    title: "Bộ chuyển đổi ảnh",
    description: "Chuyển đổi JPG, PNG, WebP và các định dạng ảnh phổ biến khác.",
  },
  resizer: {
    title: "Điều chỉnh kích thước ảnh",
    description: "Thay đổi kích thước ảnh của bạn thành kích thước chính xác trong vài giây.",
  },
  cropper: {
    title: "Cắt xén ảnh",
    description: "Cắt xén ảnh của bạn nhanh chóng với kích thước chính xác.",
  },
  "image-to-pdf": {
    title: "Ảnh sang PDF",
    description: "Biến một hoặc nhiều ảnh thành tài liệu PDF.",
  },
  "webp-converter": {
    title: "Bộ chuyển đổi WebP",
    description: "Chuyển đổi ảnh thành định dạng WebP nhanh chóng và hiệu quả.",
  },
  rotator: {
    title: "Xoay ảnh",
    description: "Xoay và chỉnh thẳng ảnh của bạn một cách dễ dàng.",
  },
  enhancer: {
    title: "Tăng cường ảnh",
    description: "Cải thiện độ rõ nét và chất lượng hình ảnh.",
  },
  "background-remover": {
    title: "Xóa nền ảnh",
    description: "Xóa nền ảnh và thay thế bằng màu sắc chuyên nghiệp.",
  },
  "image-metadata": {
    title: "Công cụ siêu dữ liệu ảnh",
    description:
      "Xem siêu dữ liệu ảnh, kiểm tra thông tin EXIF, xóa siêu dữ liệu và tải ảnh sạch.",
  },
  "passport-photo": {
    title: "Ảnh cỡ hộ chiếu",
    description: "Tạo ảnh cỡ hộ chiếu tiêu chuẩn và tờ ảnh có thể in.",
  },
  "batch-converter": {
    title: "Bộ chuyển đổi hàng loạt",
    description: "Xử lý nhiều ảnh cùng nhau trong một quy trình.",
  },
  "image-to-word": {
    title: "Ảnh sang Word",
    description: "Chuyển đổi một hoặc nhiều ảnh thành tài liệu Word.",
  },
  "word-to-image": {
    title: "Word sang ảnh",
    description: "Chuyển đổi tài liệu Word của bạn thành ảnh một cách nhanh chóng.",
  },
  "pdf-merger": {
    title: "Gộp PDF",
    description: "Kết hợp nhiều tệp PDF thành một tài liệu duy nhất.",
  },
  "pdf-splitter": {
    title: "Tách PDF",
    description: "Tách PDF thành các tài liệu riêng biệt nhanh chóng và dễ dàng.",
  },
  "pdf-compressor": {
    title: "Nén PDF",
    description: "Giảm kích thước tệp PDF trong khi vẫn giữ tài liệu dễ sử dụng.",
  },
  "pdf-to-word": {
    title: "PDF sang Word",
    description: "Chuyển đổi tệp PDF thành tài liệu Word có thể chỉnh sửa.",
  },
  "pdf-to-powerpoint": {
    title: "PDF sang PowerPoint",
    description: "Chuyển đổi tệp PDF thành bản trình bày PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF sang Excel",
    description: "Chuyển đổi tệp PDF thành bảng tính Excel.",
  },
  "word-to-pdf": {
    title: "Word sang PDF",
    description: "Chuyển đổi tài liệu Word thành tệp PDF.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint sang PDF",
    description: "Chuyển đổi bản trình bày PowerPoint thành tệp PDF.",
  },
  "excel-to-pdf": {
    title: "Excel sang PDF",
    description: "Chuyển đổi bảng tính Excel thành tệp PDF.",
  },
  "pdf-editor": {
    title: "Trình chỉnh sửa PDF",
    description: "Thêm văn bản vào trang PDF và chỉnh sửa tài liệu của bạn.",
  },
  "pdf-to-jpg": {
    title: "PDF sang JPG",
    description: "Chuyển đổi trang PDF thành ảnh JPG.",
  },
  "pdf-signer": {
    title: "Ký PDF",
    description: "Thêm chữ ký của bạn vào tài liệu PDF.",
  },
  "pdf-watermark": {
    title: "Dấu mờ PDF",
    description: "Thêm dấu mờ tùy chỉnh vào mọi trang PDF của bạn.",
  },
  "pdf-rotator": {
    title: "Xoay PDF",
    description: "Xoay các trang PDF theo đúng hướng.",
  },
  "html-to-pdf": {
    title: "HTML sang PDF",
    description: "Chuyển đổi nội dung HTML thành tài liệu PDF.",
  },
  "pdf-unlocker": {
    title: "Mở khóa PDF",
    description: "Xóa hạn chế PDF khỏi những tài liệu bạn được phép chỉnh sửa.",
  },
  "pdf-protector": {
    title: "Bảo vệ PDF",
    description: "Thêm cài đặt bảo vệ vào tài liệu PDF của bạn.",
  },
  "pdf-organizer": {
    title: "Sắp xếp PDF",
    description: "Sắp xếp lại, tổ chức và kết hợp các tệp PDF.",
  },
  "pdf-to-pdfa": {
    title: "PDF sang PDF/A",
    description: "Chuẩn bị tài liệu PDF để lưu trữ lâu dài.",
  },
  "pdf-repair": {
    title: "Sửa PDF",
    description: "Thử sửa các tệp PDF có vấn đề cấu trúc nhỏ.",
  },
  "pdf-page-numbers": {
    title: "Thêm số trang PDF",
    description: "Thêm số trang vào tài liệu PDF của bạn.",
  },
  "scan-to-pdf": {
    title: "Quét sang PDF",
    description: "Chuyển đổi ảnh đã quét thành tài liệu PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Trích xuất văn bản có thể tìm kiếm từ tài liệu PDF đã quét.",
  },
  "pdf-comparer": {
    title: "So sánh PDF",
    description: "So sánh hai tài liệu PDF và xác định sự khác biệt cơ bản.",
  },
  "pdf-redactor": {
    title: "Che PDF",
    description: "Ẩn thông tin nhạy cảm trong tài liệu PDF.",
  },
  "pdf-cropper": {
    title: "Cắt PDF",
    description: "Cắt trang PDF và xóa lề không mong muốn.",
  },
  "pdf-forms": {
    title: "Biểu mẫu PDF",
    description: "Điền vào các trường biểu mẫu PDF và thêm thông tin vào tài liệu.",
  },
  "pdf-summarizer": {
    title: "Tóm tắt PDF",
    description: "Tóm tắt tài liệu PDF và hiểu nội dung chính.",
  },
  "pdf-translator": {
    title: "Dịch PDF",
    description: "Dịch tài liệu PDF sang ngôn ngữ ưa thích của bạn.",
  },
  "pdf-to-markdown": {
    title: "PDF sang Markdown",
    description: "Chuyển đổi tài liệu PDF thành tệp Markdown.",
  },
  "social-qr-card": {
    title: "Thẻ QR mạng xã hội",
    description:
      "Tạo một mã QR duy nhất cho WhatsApp, Instagram, Facebook, X, YouTube và các liên kết xã hội khác.",
  },
  "video-to-link": {
    title: "Video → Liên kết",
    description: "Tải video lên và tạo liên kết có thể chia sẻ với thời gian hết hạn.",
  },
  "bulk-sms": {
    title: "SMS hàng loạt",
    description:
      "Cá nhân hóa một tin nhắn SMS cho từng liên hệ, kiểm tra số điện thoại rồi sao chép hoặc xuất danh sách.",
  },
  "bulk-email": {
    title: "E-mail hàng loạt",
    description:
      "Cá nhân hóa một email cho từng liên hệ, kiểm tra địa chỉ email rồi sao chép hoặc xuất danh sách.",
  },
  "audio-to-text": {
    title: "Âm thanh thành chữ",
    description:
      "Biến bản ghi âm thành văn bản có thể chỉnh sửa với tính năng chuyển lời nói thành chữ ngay trong trình duyệt. Tệp âm thanh không bao giờ được tải lên.",
  },
};

const toolTextSw: Record<string, ToolText> = {
  "shipping-label-pdf": {
    title: "Lebo ya Usafirishaji na Ankara PDF",
    description:
      "Weka lebo za usafirishaji na ankara kutoka PDF yoyote kwenye kurasa za uchapaji kamili 4×6, 100×150 mm au maalum bila kunyoosha au kukata.",
  },
  compressor: {
    title: "Kibana Picha",
    description: "Punguza ukubwa wa faili la picha huku ukidumisha ubora mzuri.",
  },
  "favicon-generator": {
    title: "Kijenereta cha Favicon",
    description:
      "Unda picha za favicon katika ukubwa mbalimbali kutoka faili za PNG, JPG, WebP au SVG.",
  },
  "qr-code-generator": {
    title: "Kijenereta cha Nambari ya QR",
    description:
      "Unda Nambari za QR kutoka URL, maandishi na taarifa nyingine papo hapo.",
  },
  "unit-converter": {
    title: "Kigeuzi cha Vipimo",
    description:
      "Badilisha vipimo vya urefu, uzito na halijoto papo hapo kwa kigeuzi rahisi cha mtandaoni.",
  },
  "percentage-calculator": {
    title: "Kikokotoo cha Asilimia",
    description: "Kokotoa asilimia ya nambari yoyote haraka na kwa urahisi.",
  },
  "case-converter": {
    title: "Kigeuzi cha Herufi Kubwa/Ndogo",
    description:
      "Badilisha maandishi kuwa herufi kubwa, herufi ndogo, mtindo wa kichwa au sentensi papo hapo.",
  },
  "character-counter": {
    title: "Kikokotoo cha Herufi",
    description:
      "Hesabu herufi, nafasi, maneno, sentensi na aya papo hapo.",
  },
  "word-counter": {
    title: "Kikokotoo cha Maneno",
    description:
      "Hesabu maneno, herufi, sentensi, aya na mistari papo hapo.",
  },
  "heic-to-jpg": {
    title: "HEIC kuwa JPG",
    description: "Badilisha picha za HEIC na HEIF kuwa JPG mtandaoni bure.",
  },
  "compress-image-to-kb": {
    title: "Bana Picha hadi KB",
    description:
      "Bana picha kuwa 20KB, 50KB, 100KB, 200KB au ukubwa maalum.",
  },
  "image-to-text": {
    title: "Picha kuwa Maandishi",
    description:
      "Toa maandishi kutoka JPG, PNG, WebP na picha nyingine kwa kutumia OCR kwenye kivinjari.",
  },
  converter: {
    title: "Kigeuzi cha Picha",
    description:
      "Badilisha JPG, PNG, WebP na fomati nyingine maarufu za picha.",
  },
  resizer: {
    title: "Kurekebisha Ukubwa wa Picha",
    description: "Rekebisha ukubwa wa picha zako kuwa vipimo sahihi kwa sekunde.",
  },
  cropper: {
    title: "Kikata Picha",
    description: "Kata picha zako haraka kwa vipimo sahihi.",
  },
  "image-to-pdf": {
    title: "Picha kuwa PDF",
    description: "Badilisha picha moja au nyingi kuwa hati ya PDF.",
  },
  "webp-converter": {
    title: "Kigeuzi cha WebP",
    description: "Badilisha picha kuwa umbizo la WebP la haraka na bora.",
  },
  rotator: {
    title: "Kigeuza Picha",
    description: "Zungusha na kunyoosha picha zako kwa urahisi.",
  },
  enhancer: {
    title: "Kiboresha Picha",
    description: "Boresha uwazi na ubora wa kuona wa picha.",
  },
  "background-remover": {
    title: "Kiondoa Mandharinyuma",
    description:
      "Ondoa mandharinyuma ya picha na ubadilishe kwa rangi za kitaalamu.",
  },
  "image-metadata": {
    title: "Zana ya Metadata ya Picha",
    description:
      "Tazama metadata ya picha, kagua maelezo ya EXIF, ondoa metadata na pakua picha safi.",
  },
  "passport-photo": {
    title: "Picha ya Saizi ya Pasipoti",
    description:
      "Unda picha za saizi ya kawaida ya pasipoti na karatasi za picha zinazoweza kuchapishwa.",
  },
  "batch-converter": {
    title: "Kigeuzi cha Kundi",
    description: "Chakata picha nyingi pamoja katika mtiririko mmoja.",
  },
  "image-to-word": {
    title: "Picha kuwa Word",
    description: "Badilisha picha moja au nyingi kuwa hati ya Word.",
  },
  "word-to-image": {
    title: "Word kuwa Picha",
    description: "Badilisha hati yako ya Word kuwa picha haraka.",
  },
  "pdf-merger": {
    title: "Unganisha PDF",
    description: "Unganisha faili nyingi za PDF kuwa hati moja.",
  },
  "pdf-splitter": {
    title: "Gawanya PDF",
    description: "Gawanya PDF kuwa hati tofauti haraka na kwa urahisi.",
  },
  "pdf-compressor": {
    title: "Bana PDF",
    description:
      "Punguza saizi ya faili la PDF huku hati zikibaki rahisi kutumia.",
  },
  "pdf-to-word": {
    title: "PDF kuwa Word",
    description: "Badilisha faili za PDF kuwa hati za Word zinazoweza kuhaririwa.",
  },
  "pdf-to-powerpoint": {
    title: "PDF kuwa PowerPoint",
    description: "Badilisha faili za PDF kuwa wasilisho za PowerPoint.",
  },
  "pdf-to-excel": {
    title: "PDF kuwa Excel",
    description: "Badilisha faili za PDF kuwa majedwali ya Excel.",
  },
  "word-to-pdf": {
    title: "Word kuwa PDF",
    description: "Badilisha hati za Word kuwa faili za PDF.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint kuwa PDF",
    description: "Badilisha wasilisho za PowerPoint kuwa faili za PDF.",
  },
  "excel-to-pdf": {
    title: "Excel kuwa PDF",
    description: "Badilisha majedwali ya Excel kuwa faili za PDF.",
  },
  "pdf-editor": {
    title: "Kihariri PDF",
    description: "Ongeza maandishi kwenye kurasa zako za PDF na hariri hati zako.",
  },
  "pdf-to-jpg": {
    title: "PDF kuwa JPG",
    description: "Badilisha kurasa za PDF kuwa picha za JPG.",
  },
  "pdf-signer": {
    title: "Tia Sahihi PDF",
    description: "Ongeza sahihi yako kwenye hati za PDF.",
  },
  "pdf-watermark": {
    title: "Alama ya Maji ya PDF",
    description: "Ongeza alama ya maji maalum kwenye kila ukurasa wa PDF yako.",
  },
  "pdf-rotator": {
    title: "Zungusha PDF",
    description: "Zungusha kurasa za PDF kwa mwelekeo sahihi.",
  },
  "html-to-pdf": {
    title: "HTML kuwa PDF",
    description: "Badilisha maudhui ya HTML kuwa hati ya PDF.",
  },
  "pdf-unlocker": {
    title: "Fungua PDF",
    description: "Ondoa vikwazo vya PDF kutoka hati unazoruhusiwa kuhariri.",
  },
  "pdf-protector": {
    title: "Linda PDF",
    description: "Ongeza mipangilio ya ulinzi kwenye hati zako za PDF.",
  },
  "pdf-organizer": {
    title: "Panga PDF",
    description: "Panga upya, pangilia na unganisha faili za PDF.",
  },
  "pdf-to-pdfa": {
    title: "PDF kuwa PDF/A",
    description: "Andaa hati za PDF kwa kuhifadhi kwa muda mrefu.",
  },
  "pdf-repair": {
    title: "Rekebisha PDF",
    description: "Jaribu kurekebisha faili za PDF zenye matatizo madogo ya muundo.",
  },
  "pdf-page-numbers": {
    title: "Ongeza Nambari za Kurasa za PDF",
    description: "Ongeza nambari za kurasa kwenye hati zako za PDF.",
  },
  "scan-to-pdf": {
    title: "Changanua kuwa PDF",
    description: "Badilisha picha zilizochanganuliwa kuwa hati ya PDF.",
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "Toa maandishi yanayoweza kutafutwa kutoka hati za PDF zilizochanganuliwa.",
  },
  "pdf-comparer": {
    title: "Linganisha PDF",
    description: "Linganisha hati mbili za PDF na tambua tofauti za msingi.",
  },
  "pdf-redactor": {
    title: "Ficha PDF",
    description: "Ficha taarifa nyeti katika hati za PDF.",
  },
  "pdf-cropper": {
    title: "Kata PDF",
    description: "Kata kurasa za PDF na ondoa pembe zisizohitajika.",
  },
  "pdf-forms": {
    title: "Fomu za PDF",
    description: "Jaza sehemu za fomu za PDF na ongeza taarifa kwenye hati.",
  },
  "pdf-summarizer": {
    title: "Muhtasari wa PDF",
    description: "Fanya muhtasari wa hati za PDF na elewa maudhui muhimu.",
  },
  "pdf-translator": {
    title: "Mtafsiri wa PDF",
    description: "Tafsiri hati za PDF katika lugha unayopendelea.",
  },
  "pdf-to-markdown": {
    title: "PDF kuwa Markdown",
    description: "Badilisha hati za PDF kuwa faili za Markdown.",
  },
  "social-qr-card": {
    title: "Kadi ya QR ya Mitandao ya Kijamii",
    description:
      "Unda nambari moja ya QR kwa viungo vya WhatsApp, Instagram, Facebook, X, YouTube na mitandao mingine ya kijamii.",
  },
  "video-to-link": {
    title: "Video → Kiungo",
    description: "Pakia video na unda kiungo kinachoweza kushirikiwa chenye muda wa kuisha.",
  },
  "bulk-sms": {
    title: "SMS ya Wingi",
    description:
      "Pekeesha ujumbe mmoja wa SMS kwa kila mwasiliani, angalia namba za simu, kisha nakili au hamisha orodha.",
  },
  "bulk-email": {
    title: "Barua pepe za Wingi",
    description:
      "Pekeesha barua pepe moja kwa kila mwasiliani, angalia anwani za barua pepe, kisha nakili au hamisha orodha.",
  },
  "audio-to-text": {
    title: "Sauti kuwa maandishi",
    description:
      "Badilisha rekodi za sauti kuwa maandishi yanayoweza kuhaririwa kwa kutumie vinjari. Faili ya sauti haihapakwi popote.",
  },
};

const toolTextByLocale: Partial<Record<Locale, Record<string, ToolText>>> = {
  en: toolTextEn,
  hi: toolTextHi,
  es: toolTextEs,
  fr: toolTextFr,
  de: toolTextDe,
  it: toolTextIt,
  pt: toolTextPt,
  ja: toolTextJa,
  ru: toolTextRu,
  ko: toolTextKo,
  "zh-cn": toolTextZhCn,
  "zh-tw": toolTextZhTw,
  ar: toolTextAr,
  bg: toolTextBg,
  ca: toolTextCa,
  nl: toolTextNl,
  el: toolTextEl,
  id: toolTextId,
  ms: toolTextMs,
  pl: toolTextPl,
  sv: toolTextSv,
  th: toolTextTh,
  tr: toolTextTr,
  uk: toolTextUk,
  vi: toolTextVi,
  sw: toolTextSw,
};

export type ShippingLabelStrings = {
  platformLabel: string;
  platformAuto: string;
  platformOther: string;
  platformHint: string;
  outputSizeLabel: string;
  size4x6: string;
  size100x150: string;
  size3x5: string;
  size4x4: string;
  sizeA4: string;
  sizeCustom: string;
  widthLabel: string;
  heightLabel: string;
  unitMm: string;
  unitIn: string;
  unitLabel: string;
  customSizeError: string;
  contentLabel: string;
  modeLabelOnly: string;
  modeInvoiceOnly: string;
  modeBoth: string;
  modeHint: string;
  printTip: string;
  uploadTitle: string;
  uploadHint: string;
  uploadPrivacy: string;
  replacePdf: string;
  pagesWord: string;
  analyzing: string;
  analysisFailed: string;
  detected: string;
  reviewSuggested: string;
  ready: string;
  reviewPages: string;
  noFilesYet: string;
  batchLimits: string;
  editorTitle: string;
  editorHint: string;
  page: string;
  regionType: string;
  kindLabel: string;
  kindInvoice: string;
  kindFull: string;
  fullPage: string;
  removeRegion: string;
  resetRegions: string;
  cancel: string;
  applySelection: string;
  sizeHint: string;
  generate: string;
  generating: string;
  noRegionForMode: string;
  sizeRequired: string;
  noValidFiles: string;
  corruptError: string;
  cropTooSmall: string;
  resultTitle: string;
  downloadAll: string;
  printHint: string;
  noResults: string;
  tooManyPages: string;
};

const shippingLabelEn: ShippingLabelStrings = {
  platformLabel: "Shipping platform",
  platformAuto: "Auto-detect",
  platformOther: "Other / Custom",
  platformHint:
    "Pick your marketplace so regions are detected with the right proportions. Auto-detect reads the text inside your PDF.",
  outputSizeLabel: "Output page size",
  size4x6: "4 × 6 in (label roll)",
  size100x150: "100 × 150 mm",
  size3x5: "3 × 5 in",
  size4x4: "4 × 4 in",
  sizeA4: "A4",
  sizeCustom: "Custom size",
  widthLabel: "Width",
  heightLabel: "Height",
  unitMm: "mm",
  unitIn: "in",
  unitLabel: "Unit",
  customSizeError: "Enter a valid width and height (10–1000 mm).",
  contentLabel: "Content",
  modeLabelOnly: "Shipping label",
  modeInvoiceOnly: "Invoice",
  modeBoth: "Label + Invoice",
  modeHint:
    "Every selected region is placed on its own exact-size page and scaled to fit — never stretched, never cut.",
  printTip:
    "Tip: print at 100% scale (no “fit to page”) so the output keeps its exact physical size.",
  uploadTitle: "Drop PDF files here",
  uploadHint: "or click to browse — up to 10 files, 50 MB each",
  uploadPrivacy:
    "Everything is processed in your browser. Your files are never uploaded to a server.",
  replacePdf: "Add more PDFs",
  pagesWord: "pages",
  analyzing: "Analyzing…",
  analysisFailed: "Could not read this PDF.",
  detected: "Detected",
  reviewSuggested: "Review suggested",
  ready: "Ready",
  reviewPages: "Review pages",
  noFilesYet: "Upload PDFs to see page previews and adjust label areas.",
  batchLimits: "Max 10 files and 200 pages per batch.",
  editorTitle: "Adjust label & invoice area",
  editorHint:
    "Drag inside the box to move it. Drag a corner to resize. Change what the region contains with the buttons below.",
  page: "Page",
  regionType: "Region type",
  kindLabel: "Label",
  kindInvoice: "Invoice",
  kindFull: "Full page",
  fullPage: "Fit full page",
  removeRegion: "Remove region",
  resetRegions: "Reset",
  cancel: "Cancel",
  applySelection: "Apply selection",
  sizeHint: "The output page keeps this exact ratio — no stretching, no cutting.",
  generate: "Generate PDF",
  generating: "Generating…",
  noRegionForMode:
    "No matching region found on any page. Pick another content type or adjust the regions.",
  sizeRequired: "Choose a valid output size first.",
  noValidFiles: "Add at least one readable PDF first.",
  corruptError: "This PDF is damaged or password-protected and cannot be processed.",
  cropTooSmall: "The selected region is too small for the output page. Please adjust the selection.",
  resultTitle: "Your PDFs",
  downloadAll: "Download all (ZIP)",
  printHint:
    "Print at 100% scale (choose “Actual size”, never “Fit to page”) for exact label dimensions.",
  noResults: "Your generated PDFs will appear here.",
  tooManyPages: "Page limit reached (200 pages per batch). Remove some files.",
};

const shippingLabelByLocale: Partial<Record<Locale, ShippingLabelStrings>> = {
  en: shippingLabelEn,
  hi: {
    platformLabel: "शिपिंग प्लेटफ़ॉर्म",
    platformAuto: "स्वतः पहचान",
    platformOther: "अन्य / कस्टम",
    platformHint:
      "सही अनुपात में क्षेत्रों की पहचान के लिए अपना मार्केटप्लेस चुनें। स्वतः पहचान आपके PDF का टेक्स्ट पढ़ती है।",
    outputSizeLabel: "आउटपुट पेज आकार",
    size4x6: "4 × 6 इंच (लेबल रोल)",
    size100x150: "100 × 150 मिमी",
    size3x5: "3 × 5 इंच",
    size4x4: "4 × 4 इंच",
    sizeA4: "A4",
    sizeCustom: "कस्टम आकार",
    widthLabel: "चौड़ाई",
    heightLabel: "ऊंचाई",
    unitMm: "मिमी",
    unitIn: "इंच",
    unitLabel: "इकाई",
    customSizeError: "मान्य चौड़ाई और ऊंचाई दर्ज करें (10–1000 मिमी)।",
    contentLabel: "सामग्री",
    modeLabelOnly: "शिपिंग लेबल",
    modeInvoiceOnly: "चालान",
    modeBoth: "लेबल + चालान",
    modeHint:
      "हर चुने गए क्षेत्र को अपने अलग सटीक-आकार वाले पेज पर रखा जाता है और फिट किया जाता है — कभी खिंचाव नहीं, कभी कटाव नहीं।",
    printTip:
      "सुझाव: 100% स्केल पर प्रिंट करें (“फ़िट टू पेज” न चुनें) ताकि आउटपुट का सटीक भौतिक आकार बना रहे।",
    uploadTitle: "यहाँ PDF फ़ाइलें छोड़ें",
    uploadHint: "या ब्राउज़ करने के लिए क्लिक करें — अधिकतम 10 फ़ाइलें, प्रत्येक 50 MB",
    uploadPrivacy:
      "सब कुछ आपके ब्राउज़र में ही संसाधित होता है। आपकी फ़ाइलें कभी सर्वर पर अपलोड नहीं होतीं।",
    replacePdf: "और PDF जोड़ें",
    pagesWord: "पेज",
    analyzing: "विश्लेषण हो रहा है…",
    analysisFailed: "यह PDF पढ़ी नहीं जा सकी।",
    detected: "पहचाना गया",
    reviewSuggested: "समीक्षा अनुशंसित",
    ready: "तैयार",
    reviewPages: "पेज समीक्षा करें",
    noFilesYet:
      "पेज पूर्वावलोकन देखने और लेबल क्षेत्र समायोजित करने के लिए PDF अपलोड करें।",
    batchLimits: "प्रति बैच अधिकतम 10 फ़ाइलें और 200 पेज।",
    editorTitle: "लेबल व चालान क्षेत्र समायोजित करें",
    editorHint:
      "बॉक्स के अंदर खींचकर उसे ले जाएँ। कोने पर खींचकर आकार बदलें। नीचे दिए बटनों से क्षेत्र की सामग्री बदलें।",
    page: "पेज",
    regionType: "क्षेत्र प्रकार",
    kindLabel: "लेबल",
    kindInvoice: "चालान",
    kindFull: "पूरा पेज",
    fullPage: "पूरा पेज फिट करें",
    removeRegion: "क्षेत्र हटाएँ",
    resetRegions: "रीसेट",
    cancel: "रद्द करें",
    applySelection: "चयन लागू करें",
    sizeHint:
      "आउटपुट पेज इसी सटीक अनुपात को रखता है — न खिंचाव, न कटाव।",
    generate: "PDF बनाएँ",
    generating: "बन रहा है…",
    noRegionForMode:
      "किसी भी पेज पर मेल खाता क्षेत्र नहीं मिला। कोई और सामग्री प्रकार चुनें या क्षेत्र समायोजित करें।",
    sizeRequired: "पहले मान्य आउटपुट आकार चुनें।",
    noValidFiles: "पहले कम से कम एक पठनीय PDF जोड़ें।",
    corruptError:
      "यह PDF क्षतिग्रस्त या पासवर्ड-सुरक्षित है और इसे संसाधित नहीं किया जा सकता।",
    cropTooSmall:
      "चयनित क्षेत्र आउटपुट पेज के लिए बहुत छोटा है। कृपया चयन समायोजित करें।",
    resultTitle: "आपकी PDF",
    downloadAll: "सभी डाउनलोड करें (ZIP)",
    printHint:
      "सटीक लेबल माप के लिए 100% स्केल पर प्रिंट करें (“वास्तविक आकार” चुनें, “फ़िट टू पेज” कभी नहीं)।",
    noResults: "आपके बनाए गए PDF यहाँ दिखाई देंगे।",
    tooManyPages:
      "पेज सीमा पूरी हो गई (प्रति बैच 200 पेज)। कुछ फ़ाइलें हटाएँ।",
  },
  es: {
    platformLabel: "Plataforma de envío",
    platformAuto: "Detección automática",
    platformOther: "Otra / Personalizada",
    platformHint:
      "Elige tu marketplace para que las regiones se detecten con las proporciones correctas. La detección automática lee el texto de tu PDF.",
    outputSizeLabel: "Tamaño de página de salida",
    size4x6: "4 × 6 in (rollo de etiquetas)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 in",
    size4x4: "4 × 4 in",
    sizeA4: "A4",
    sizeCustom: "Tamaño personalizado",
    widthLabel: "Ancho",
    heightLabel: "Alto",
    unitMm: "mm",
    unitIn: "in",
    unitLabel: "Unidad",
    customSizeError: "Introduce un ancho y un alto válidos (10–1000 mm).",
    contentLabel: "Contenido",
    modeLabelOnly: "Etiqueta de envío",
    modeInvoiceOnly: "Factura",
    modeBoth: "Etiqueta + Factura",
    modeHint:
      "Cada región seleccionada se coloca en su propia página de tamaño exacto y se escala para encajar — nunca se estira ni se recorta.",
    printTip:
      "Consejo: imprime al 100 % de escala (sin “ajustar a la página”) para que la salida conserve su tamaño físico exacto.",
    uploadTitle: "Suelta archivos PDF aquí",
    uploadHint: "o haz clic para examinar — hasta 10 archivos, 50 MB cada uno",
    uploadPrivacy:
      "Todo se procesa en tu navegador. Tus archivos nunca se suben a un servidor.",
    replacePdf: "Añadir más PDF",
    pagesWord: "páginas",
    analyzing: "Analizando…",
    analysisFailed: "No se pudo leer este PDF.",
    detected: "Detectado",
    reviewSuggested: "Revisión sugerida",
    ready: "Listo",
    reviewPages: "Revisar páginas",
    noFilesYet:
      "Sube PDF para ver las vistas previas de las páginas y ajustar las áreas de la etiqueta.",
    batchLimits: "Máximo 10 archivos y 200 páginas por lote.",
    editorTitle: "Ajustar área de etiqueta y factura",
    editorHint:
      "Arrastra dentro del cuadro para moverlo. Arrastra una esquina para redimensionar. Cambia el contenido de la región con los botones de abajo.",
    page: "Página",
    regionType: "Tipo de región",
    kindLabel: "Etiqueta",
    kindInvoice: "Factura",
    kindFull: "Página completa",
    fullPage: "Ajustar página completa",
    removeRegion: "Eliminar región",
    resetRegions: "Restablecer",
    cancel: "Cancelar",
    applySelection: "Aplicar selección",
    sizeHint:
      "La página de salida mantiene esta proporción exacta — sin estirar, sin recortar.",
    generate: "Generar PDF",
    generating: "Generando…",
    noRegionForMode:
      "No se encontró ninguna región coincidente en las páginas. Elige otro tipo de contenido o ajusta las regiones.",
    sizeRequired: "Elige primero un tamaño de salida válido.",
    noValidFiles: "Añade al menos un PDF legible primero.",
    corruptError:
      "Este PDF está dañado o protegido con contraseña y no se puede procesar.",
    cropTooSmall:
      "La región seleccionada es demasiado pequeña para la página de salida. Ajusta la selección.",
    resultTitle: "Tus PDF",
    downloadAll: "Descargar todo (ZIP)",
    printHint:
      "Imprime al 100 % de escala (elige “Tamaño real”, nunca “Ajustar a la página”) para obtener las dimensiones exactas de la etiqueta.",
    noResults: "Tus PDF generados aparecerán aquí.",
    tooManyPages:
      "Límite de páginas alcanzado (200 páginas por lote). Elimina algunos archivos.",
  },
  fr: {
    platformLabel: "Plateforme d’expédition",
    platformAuto: "Détection automatique",
    platformOther: "Autre / Personnalisée",
    platformHint:
      "Choisissez votre marketplace pour que les zones soient détectées avec les bonnes proportions. La détection automatique lit le texte de votre PDF.",
    outputSizeLabel: "Taille de page de sortie",
    size4x6: "4 × 6 po (rouleau d’étiquettes)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 po",
    size4x4: "4 × 4 po",
    sizeA4: "A4",
    sizeCustom: "Taille personnalisée",
    widthLabel: "Largeur",
    heightLabel: "Hauteur",
    unitMm: "mm",
    unitIn: "po",
    unitLabel: "Unité",
    customSizeError: "Saisissez une largeur et une hauteur valides (10–1000 mm).",
    contentLabel: "Contenu",
    modeLabelOnly: "Étiquette d’expédition",
    modeInvoiceOnly: "Facture",
    modeBoth: "Étiquette + Facture",
    modeHint:
      "Chaque zone sélectionnée est placée sur sa propre page de taille exacte et mise à l’échelle pour tenir — jamais étirée, jamais coupée.",
    printTip:
      "Astuce : imprimez à 100 % d’échelle (sans “adapter à la page”) pour que la sortie conserve sa taille physique exacte.",
    uploadTitle: "Déposez vos fichiers PDF ici",
    uploadHint: "ou cliquez pour parcourir — jusqu’à 10 fichiers, 50 Mo chacun",
    uploadPrivacy:
      "Tout est traité dans votre navigateur. Vos fichiers ne sont jamais envoyés vers un serveur.",
    replacePdf: "Ajouter d’autres PDF",
    pagesWord: "pages",
    analyzing: "Analyse…",
    analysisFailed: "Impossible de lire ce PDF.",
    detected: "Détecté",
    reviewSuggested: "Vérification suggérée",
    ready: "Prêt",
    reviewPages: "Vérifier les pages",
    noFilesYet:
      "Importez des PDF pour voir les aperçus des pages et ajuster les zones d’étiquette.",
    batchLimits: "10 fichiers et 200 pages maximum par lot.",
    editorTitle: "Ajuster la zone étiquette et facture",
    editorHint:
      "Glissez dans le cadre pour le déplacer. Glissez un coin pour redimensionner. Changez le contenu de la zone avec les boutons ci-dessous.",
    page: "Page",
    regionType: "Type de zone",
    kindLabel: "Étiquette",
    kindInvoice: "Facture",
    kindFull: "Page entière",
    fullPage: "Ajuster la page entière",
    removeRegion: "Supprimer la zone",
    resetRegions: "Réinitialiser",
    cancel: "Annuler",
    applySelection: "Appliquer la sélection",
    sizeHint:
      "La page de sortie conserve ce ratio exact — sans étirement, sans découpe.",
    generate: "Générer le PDF",
    generating: "Génération…",
    noRegionForMode:
      "Aucune zone correspondante trouvée sur les pages. Choisissez un autre type de contenu ou ajustez les zones.",
    sizeRequired: "Choisissez d’abord une taille de sortie valide.",
    noValidFiles: "Ajoutez d’abord au moins un PDF lisible.",
    corruptError:
      "Ce PDF est endommagé ou protégé par mot de passe et ne peut pas être traité.",
    cropTooSmall:
      "La zone sélectionnée est trop petite pour la page de sortie. Veuillez ajuster la sélection.",
    resultTitle: "Vos PDF",
    downloadAll: "Tout télécharger (ZIP)",
    printHint:
      "Imprimez à 100 % d’échelle (choisissez “Taille réelle”, jamais “Adapter à la page”) pour des dimensions d’étiquette exactes.",
    noResults: "Vos PDF générés apparaîtront ici.",
    tooManyPages:
      "Limite de pages atteinte (200 pages par lot). Supprimez certains fichiers.",
  },
  de: {
    platformLabel: "Versandplattform",
    platformAuto: "Automatische Erkennung",
    platformOther: "Weitere / Benutzerdefiniert",
    platformHint:
      "Wählen Sie Ihren Marktplatz, damit die Bereiche mit den richtigen Proportionen erkannt werden. Die automatische Erkennung liest den Text in Ihrem PDF.",
    outputSizeLabel: "Ausgabeseitengröße",
    size4x6: "4 × 6 in (Etikettenrolle)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 in",
    size4x4: "4 × 4 in",
    sizeA4: "A4",
    sizeCustom: "Benutzerdefinierte Größe",
    widthLabel: "Breite",
    heightLabel: "Höhe",
    unitMm: "mm",
    unitIn: "in",
    unitLabel: "Einheit",
    customSizeError:
      "Geben Sie eine gültige Breite und Höhe ein (10–1000 mm).",
    contentLabel: "Inhalt",
    modeLabelOnly: "Versandetikett",
    modeInvoiceOnly: "Rechnung",
    modeBoth: "Etikett + Rechnung",
    modeHint:
      "Jeder ausgewählte Bereich wird auf einer eigenen Seite in exakter Größe platziert und skaliert, um hineinzupassen — nie verzerrt, nie abgeschnitten.",
    printTip:
      "Tipp: Drucken Sie mit 100 % Skalierung (ohne “an Seite anpassen”), damit die Ausgabe ihre exakte physische Größe behält.",
    uploadTitle: "PDF-Dateien hier ablegen",
    uploadHint:
      "oder klicken zum Auswählen — bis zu 10 Dateien, je 50 MB",
    uploadPrivacy:
      "Alles wird in Ihrem Browser verarbeitet. Ihre Dateien werden nie auf einen Server hochgeladen.",
    replacePdf: "Weitere PDFs hinzufügen",
    pagesWord: "Seiten",
    analyzing: "Wird analysiert…",
    analysisFailed: "Diese PDF konnte nicht gelesen werden.",
    detected: "Erkannt",
    reviewSuggested: "Prüfung empfohlen",
    ready: "Bereit",
    reviewPages: "Seiten prüfen",
    noFilesYet:
      "Laden Sie PDFs hoch, um Seitenvorschauen zu sehen und die Etikettenbereiche anzupassen.",
    batchLimits: "Maximal 10 Dateien und 200 Seiten pro Stapel.",
    editorTitle: "Etiketten- und Rechnungsbereich anpassen",
    editorHint:
      "Ziehen Sie im Rahmen, um ihn zu verschieben. Ziehen Sie eine Ecke zum Skalieren. Ändern Sie den Bereichsinhalt mit den Schaltflächen unten.",
    page: "Seite",
    regionType: "Bereichstyp",
    kindLabel: "Etikett",
    kindInvoice: "Rechnung",
    kindFull: "Ganze Seite",
    fullPage: "Ganze Seite einpassen",
    removeRegion: "Bereich entfernen",
    resetRegions: "Zurücksetzen",
    cancel: "Abbrechen",
    applySelection: "Auswahl übernehmen",
    sizeHint:
      "Die Ausgabeseite behält dieses exakte Seitenverhältnis — keine Verzerrung, kein Beschnitt.",
    generate: "PDF erstellen",
    generating: "Wird erstellt…",
    noRegionForMode:
      "Auf keiner Seite wurde ein passender Bereich gefunden. Wählen Sie einen anderen Inhaltstyp oder passen Sie die Bereiche an.",
    sizeRequired: "Wählen Sie zuerst eine gültige Ausgabegröße.",
    noValidFiles: "Fügen Sie zuerst mindestens eine lesbare PDF hinzu.",
    corruptError:
      "Diese PDF ist beschädigt oder passwortgeschützt und kann nicht verarbeitet werden.",
    cropTooSmall:
      "Der ausgewählte Bereich ist für die Ausgabeseite zu klein. Bitte passen Sie die Auswahl an.",
    resultTitle: "Ihre PDFs",
    downloadAll: "Alle herunterladen (ZIP)",
    printHint:
      "Drucken Sie mit 100 % Skalierung (“Tatsächliche Größe” wählen, niemals “an Seite anpassen”) für exakte Etikettenmaße.",
    noResults: "Ihre erstellten PDFs erscheinen hier.",
    tooManyPages:
      "Seitenlimit erreicht (200 Seiten pro Stapel). Entfernen Sie einige Dateien.",
  },
  it: {
    platformLabel: "Piattaforma di spedizione",
    platformAuto: "Rilevamento automatico",
    platformOther: "Altra / Personalizzata",
    platformHint:
      "Scegli il tuo marketplace perché le aree vengano rilevate con le proporzioni giuste. Il rilevamento automatico legge il testo del tuo PDF.",
    outputSizeLabel: "Dimensione pagina di output",
    size4x6: "4 × 6 in (rotolo di etichette)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 in",
    size4x4: "4 × 4 in",
    sizeA4: "A4",
    sizeCustom: "Dimensione personalizzata",
    widthLabel: "Larghezza",
    heightLabel: "Altezza",
    unitMm: "mm",
    unitIn: "in",
    unitLabel: "Unità",
    customSizeError:
      "Inserisci una larghezza e un’altezza valide (10–1000 mm).",
    contentLabel: "Contenuto",
    modeLabelOnly: "Etichetta di spedizione",
    modeInvoiceOnly: "Fattura",
    modeBoth: "Etichetta + Fattura",
    modeHint:
      "Ogni area selezionata viene collocata sulla sua pagina di dimensione esatta e ridimensionata per stare dentro — mai stirata, mai tagliata.",
    printTip:
      "Suggerimento: stampa al 100 % di scala (senza “adatta alla pagina”) perché l’output conservi le sue dimensioni fisiche esatte.",
    uploadTitle: "Rilascia qui i file PDF",
    uploadHint:
      "o clicca per sfogliare — fino a 10 file, 50 MB ciascuno",
    uploadPrivacy:
      "Tutto viene elaborato nel tuo browser. I tuoi file non vengono mai caricati su un server.",
    replacePdf: "Aggiungi altri PDF",
    pagesWord: "pagine",
    analyzing: "Analisi…",
    analysisFailed: "Impossibile leggere questo PDF.",
    detected: "Rilevato",
    reviewSuggested: "Revisione consigliata",
    ready: "Pronto",
    reviewPages: "Controlla le pagine",
    noFilesYet:
      "Carica dei PDF per vedere le anteprime delle pagine e regolare le aree dell’etichetta.",
    batchLimits: "Max 10 file e 200 pagine per lotto.",
    editorTitle: "Regola area etichetta e fattura",
    editorHint:
      "Trascina dentro il riquadro per spostarlo. Trascina un angolo per ridimensionare. Cambia il contenuto dell’area con i pulsanti sotto.",
    page: "Pagina",
    regionType: "Tipo di area",
    kindLabel: "Etichetta",
    kindInvoice: "Fattura",
    kindFull: "Pagina intera",
    fullPage: "Adatta pagina intera",
    removeRegion: "Rimuovi area",
    resetRegions: "Reimposta",
    cancel: "Annulla",
    applySelection: "Applica selezione",
    sizeHint:
      "La pagina di output mantiene questa proporzione esatta — senza stiramento, senza ritaglio.",
    generate: "Genera PDF",
    generating: "Generazione…",
    noRegionForMode:
      "Nessuna area corrispondente trovata nelle pagine. Scegli un altro tipo di contenuto o regola le aree.",
    sizeRequired: "Scegli prima una dimensione di output valida.",
    noValidFiles: "Aggiungi prima almeno un PDF leggibile.",
    corruptError:
      "Questo PDF è danneggiato o protetto da password e non può essere elaborato.",
    cropTooSmall:
      "L’area selezionata è troppo piccola per la pagina di output. Regola la selezione.",
    resultTitle: "I tuoi PDF",
    downloadAll: "Scarica tutto (ZIP)",
    printHint:
      "Stampa al 100 % di scala (scegli “Dimensioni reali”, mai “Adatta alla pagina”) per dimensioni esatte dell’etichetta.",
    noResults: "I tuoi PDF generati appariranno qui.",
    tooManyPages:
      "Limite di pagine raggiunto (200 pagine per lotto). Rimuovi alcuni file.",
  },
  pt: {
    platformLabel: "Plataforma de envio",
    platformAuto: "Detecção automática",
    platformOther: "Outra / Personalizada",
    platformHint:
      "Escolha o seu marketplace para que as regiões sejam detectadas com as proporções corretas. A detecção automática lê o texto do seu PDF.",
    outputSizeLabel: "Tamanho da página de saída",
    size4x6: "4 × 6 in (rolo de etiquetas)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 in",
    size4x4: "4 × 4 in",
    sizeA4: "A4",
    sizeCustom: "Tamanho personalizado",
    widthLabel: "Largura",
    heightLabel: "Altura",
    unitMm: "mm",
    unitIn: "in",
    unitLabel: "Unidade",
    customSizeError:
      "Insira uma largura e uma altura válidas (10–1000 mm).",
    contentLabel: "Conteúdo",
    modeLabelOnly: "Etiqueta de envio",
    modeInvoiceOnly: "Fatura",
    modeBoth: "Etiqueta + Fatura",
    modeHint:
      "Cada região selecionada é colocada na sua própria página de tamanho exato e escalada para caber — nunca esticada, nunca cortada.",
    printTip:
      "Dica: imprima com 100 % de escala (sem “ajustar à página”) para que a saída mantenha o seu tamanho físico exato.",
    uploadTitle: "Solte os arquivos PDF aqui",
    uploadHint:
      "ou clique para procurar — até 10 arquivos, 50 MB cada",
    uploadPrivacy:
      "Tudo é processado no seu navegador. Os seus arquivos nunca são enviados para um servidor.",
    replacePdf: "Adicionar mais PDFs",
    pagesWord: "páginas",
    analyzing: "Analisando…",
    analysisFailed: "Não foi possível ler este PDF.",
    detected: "Detectado",
    reviewSuggested: "Revisão sugerida",
    ready: "Pronto",
    reviewPages: "Rever páginas",
    noFilesYet:
      "Carregue PDFs para ver as pré-visualizações das páginas e ajustar as áreas da etiqueta.",
    batchLimits: "Máximo de 10 arquivos e 200 páginas por lote.",
    editorTitle: "Ajustar área de etiqueta e fatura",
    editorHint:
      "Arraste dentro da caixa para movê-la. Arraste um canto para redimensionar. Altere o conteúdo da região com os botões abaixo.",
    page: "Página",
    regionType: "Tipo de região",
    kindLabel: "Etiqueta",
    kindInvoice: "Fatura",
    kindFull: "Página inteira",
    fullPage: "Ajustar página inteira",
    removeRegion: "Remover região",
    resetRegions: "Redefinir",
    cancel: "Cancelar",
    applySelection: "Aplicar seleção",
    sizeHint:
      "A página de saída mantém esta proporção exata — sem esticar, sem cortar.",
    generate: "Gerar PDF",
    generating: "Gerando…",
    noRegionForMode:
      "Nenhuma região correspondente encontrada nas páginas. Escolha outro tipo de conteúdo ou ajuste as regiões.",
    sizeRequired: "Escolha primeiro um tamanho de saída válido.",
    noValidFiles: "Adicione pelo menos um PDF legível primeiro.",
    corruptError:
      "Este PDF está danificado ou protegido por senha e não pode ser processado.",
    cropTooSmall:
      "A região selecionada é pequena demais para a página de saída. Ajuste a seleção.",
    resultTitle: "Os seus PDFs",
    downloadAll: "Baixar tudo (ZIP)",
    printHint:
      "Imprima com 100 % de escala (escolha “Tamanho real”, nunca “Ajustar à página”) para dimensões exatas da etiqueta.",
    noResults: "Os seus PDFs gerados aparecerão aqui.",
    tooManyPages:
      "Limite de páginas atingido (200 páginas por lote). Remova alguns arquivos.",
  },
  ja: {
    platformLabel: "配送プラットフォーム",
    platformAuto: "自動検出",
    platformOther: "その他 / カスタム",
    platformHint:
      "正しい比率で領域を検出するため、マーケットプレイスを選択してください。自動検出は PDF 内のテキストを読み取ります。",
    outputSizeLabel: "出力ページサイズ",
    size4x6: "4 × 6 インチ（ラベルロール）",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 インチ",
    size4x4: "4 × 4 インチ",
    sizeA4: "A4",
    sizeCustom: "カスタムサイズ",
    widthLabel: "幅",
    heightLabel: "高さ",
    unitMm: "mm",
    unitIn: "インチ",
    unitLabel: "単位",
    customSizeError: "幅と高さに有効な値を入力してください（10–1000 mm）。",
    contentLabel: "内容",
    modeLabelOnly: "配送ラベル",
    modeInvoiceOnly: "請求書",
    modeBoth: "ラベル + 請求書",
    modeHint:
      "選択した各領域は、それぞれ正確なサイズのページに配置され、縦横比を保ったまま縮小・拡大されます — 拡張や切り抜きは行われません。",
    printTip:
      "ヒント: 出力の実寸を保つには、100% スケール（「ページに合わせる」は使用しない）で印刷してください。",
    uploadTitle: "ここに PDF ファイルをドロップ",
    uploadHint: "またはクリックして参照 — 最大 10 ファイル、各 50 MB",
    uploadPrivacy:
      "すべてブラウザー内で処理されます。ファイルがサーバーにアップされることはありません。",
    replacePdf: "PDF を追加",
    pagesWord: "ページ",
    analyzing: "分析中…",
    analysisFailed: "この PDF を読み取れませんでした。",
    detected: "検出済み",
    reviewSuggested: "要確認",
    ready: "準備完了",
    reviewPages: "ページを確認",
    noFilesYet:
      "PDF をアップロードすると、ページのプレビューを確認してラベル領域を調整できます。",
    batchLimits: "1 バッチあたり最大 10 ファイル・200 ページ。",
    editorTitle: "ラベル・請求書の領域を調整",
    editorHint:
      "枠の内側をドラッグで移動、角をドラッグでサイズ変更できます。下のボタンで領域の種類を切り替えます。",
    page: "ページ",
    regionType: "領域の種類",
    kindLabel: "ラベル",
    kindInvoice: "請求書",
    kindFull: "ページ全体",
    fullPage: "ページ全体を合わせる",
    removeRegion: "領域を削除",
    resetRegions: "リセット",
    cancel: "キャンセル",
    applySelection: "選択を適用",
    sizeHint: "出力ページはこの正確な比率を保ちます — 拡張も切り抜きもありません。",
    generate: "PDF を生成",
    generating: "生成中…",
    noRegionForMode:
      "該当する領域が見つかりません。別の内容種別を選ぶか、領域を調整してください。",
    sizeRequired: "先に有効な出力サイズを選択してください。",
    noValidFiles: "先に読み取り可能な PDF を 1 つ以上追加してください。",
    corruptError:
      "この PDF は破損またはパスワード保護されており、処理できません。",
    cropTooSmall:
      "選択した領域は出力ページに対して小さすぎます。選択を調整してください。",
    resultTitle: "生成された PDF",
    downloadAll: "すべてダウンロード（ZIP）",
    printHint:
      "正確なラベル寸法のために、100% スケール（「実際のサイズ」を選択し、「ページに合わせる」は使用しない）で印刷してください。",
    noResults: "生成した PDF はここに表示されます。",
    tooManyPages:
      "ページ数の上限に達しました（1 バッチ 200 ページ）。一部のファイルを削除してください。",
  },
  ru: {
    platformLabel: "Платформа доставки",
    platformAuto: "Автоопределение",
    platformOther: "Другая / Пользовательская",
    platformHint:
      "Выберите маркетплейс, чтобы области определялись с правильными пропорциями. Автоопределение читает текст в вашем PDF.",
    outputSizeLabel: "Размер страницы вывода",
    size4x6: "4 × 6 дюймов (рулон этикеток)",
    size100x150: "100 × 150 мм",
    size3x5: "3 × 5 дюймов",
    size4x4: "4 × 4 дюйма",
    sizeA4: "A4",
    sizeCustom: "Пользовательский размер",
    widthLabel: "Ширина",
    heightLabel: "Высота",
    unitMm: "мм",
    unitIn: "дюйм",
    unitLabel: "Единица",
    customSizeError: "Введите допустимые ширину и высоту (10–1000 мм).",
    contentLabel: "Содержимое",
    modeLabelOnly: "Товарная этикетка",
    modeInvoiceOnly: "Накладная",
    modeBoth: "Этикетка + накладная",
    modeHint:
      "Каждая выбранная область размещается на отдельной странице точного размера и масштабируется по пропорциям — без растяжения и обрезки.",
    printTip:
      "Совет: печатайте с масштабом 100 % (без “подгонки под страницу”), чтобы вывод сохранил точный физический размер.",
    uploadTitle: "Перетащите PDF-файлы сюда",
    uploadHint: "или нажмите, чтобы выбрать — до 10 файлов, по 50 МБ",
    uploadPrivacy:
      "Всё обрабатывается в вашем браузере. Файлы никогда не загружаются на сервер.",
    replacePdf: "Добавить ещё PDF",
    pagesWord: "стр.",
    analyzing: "Анализ…",
    analysisFailed: "Не удалось прочитать этот PDF.",
    detected: "Определено",
    reviewSuggested: "Рекомендуется проверка",
    ready: "Готово",
    reviewPages: "Проверить страницы",
    noFilesYet:
      "Загрузите PDF, чтобы увидеть предпросмотр страниц и настроить области этикетки.",
    batchLimits: "Не более 10 файлов и 200 страниц в пакете.",
    editorTitle: "Настройка области этикетки и накладной",
    editorHint:
      "Перетаскивайте внутри рамки, чтобы переместить. Тяните угол, чтобы изменить размер. Меняйте тип области кнопками ниже.",
    page: "Страница",
    regionType: "Тип области",
    kindLabel: "Этикетка",
    kindInvoice: "Накладная",
    kindFull: "Вся страница",
    fullPage: "Вписать всю страницу",
    removeRegion: "Удалить область",
    resetRegions: "Сбросить",
    cancel: "Отмена",
    applySelection: "Применить выбор",
    sizeHint:
      "Страница вывода сохраняет точные пропорции — без растяжения и обрезки.",
    generate: "Создать PDF",
    generating: "Создание…",
    noRegionForMode:
      "Подходящих областей не найдено. Выберите другой тип содержимого или настройте области.",
    sizeRequired: "Сначала выберите допустимый размер вывода.",
    noValidFiles: "Сначала добавьте хотя бы один читаемый PDF.",
    corruptError:
      "Этот PDF повреждён или защищён паролем и не может быть обработан.",
    cropTooSmall:
      "Выбранная область слишком мала для страницы вывода. Измените выделение.",
    resultTitle: "Ваши PDF",
    downloadAll: "Скачать всё (ZIP)",
    printHint:
      "Печатайте с масштабом 100 % (выбирайте “Фактический размер”, а не “Подгонить под страницу”) для точных размеров этикетки.",
    noResults: "Здесь появятся созданные вами PDF.",
    tooManyPages:
      "Достигнут предел страниц (200 на пакет). Удалите часть файлов.",
  },
  ko: {
    platformLabel: "배송 플랫폼",
    platformAuto: "자동 감지",
    platformOther: "기타 / 사용자 지정",
    platformHint:
      "올바른 비율로 영역을 감지하도록 마켓플레이스를 선택하세요. 자동 감지는 PDF 안의 텍스트를 읽습니다.",
    outputSizeLabel: "출력 페이지 크기",
    size4x6: "4 × 6인치 (라벨 롤)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5인치",
    size4x4: "4 × 4인치",
    sizeA4: "A4",
    sizeCustom: "사용자 지정 크기",
    widthLabel: "너비",
    heightLabel: "높이",
    unitMm: "mm",
    unitIn: "인치",
    unitLabel: "단위",
    customSizeError: "올바른 너비와 높이를 입력하세요 (10–1000 mm).",
    contentLabel: "내용",
    modeLabelOnly: "배송 라벨",
    modeInvoiceOnly: "청구서",
    modeBoth: "라벨 + 청구서",
    modeHint:
      "선택한 각 영역은 정확한 크기의 페이지에 각각 배치되고 비율을 유지한 채 맞춰집니다 — 늘리거나 잘리지 않습니다.",
    printTip:
      "팁: 출력물의 실제 크기를 유지하려면 100% 배율(“페이지 맞춤” 사용 금지)로 인쇄하세요.",
    uploadTitle: "PDF 파일을 여기에 놓으세요",
    uploadHint: "또는 클릭하여 찾아보기 — 최대 10개, 각 50 MB",
    uploadPrivacy:
      "모든 처리는 브라우저에서 이루어집니다. 파일은 절대 서버로 업로드되지 않습니다.",
    replacePdf: "PDF 추가",
    pagesWord: "쪽",
    analyzing: "분석 중…",
    analysisFailed: "이 PDF를 읽을 수 없습니다.",
    detected: "감지됨",
    reviewSuggested: "검토 권장",
    ready: "준비 완료",
    reviewPages: "페이지 검토",
    noFilesYet:
      "PDF를 업로드하면 페이지 미리보기를 보고 라벨 영역을 조정할 수 있습니다.",
    batchLimits: "배치당 최대 10개 파일, 200쪽.",
    editorTitle: "라벨 및 청구서 영역 조정",
    editorHint:
      "상자 안을 드래그해 이동하고, 모서리를 드래그해 크기를 바꿉니다. 아래 버튼으로 영역 종류를 변경하세요.",
    page: "쪽",
    regionType: "영역 유형",
    kindLabel: "라벨",
    kindInvoice: "청구서",
    kindFull: "전체 페이지",
    fullPage: "전체 페이지 맞추기",
    removeRegion: "영역 삭제",
    resetRegions: "초기화",
    cancel: "취소",
    applySelection: "선택 적용",
    sizeHint: "출력 페이지는 이 정확한 비율을 유지합니다 — 늘림 없음, 잘림 없음.",
    generate: "PDF 생성",
    generating: "생성 중…",
    noRegionForMode:
      "일치하는 영역이 없습니다. 다른 내용 유형을 선택하거나 영역을 조정하세요.",
    sizeRequired: "먼저 유효한 출력 크기를 선택하세요.",
    noValidFiles: "먼저 읽을 수 있는 PDF를 하나 이상 추가하세요.",
    corruptError: "이 PDF는 손상되었거나 비밀번호로 보호되어 처리할 수 없습니다.",
    cropTooSmall: "선택한 영역이 출력 페이지에 비해 너무 작습니다. 선택을 조정하세요.",
    resultTitle: "내 PDF",
    downloadAll: "모두 다운로드 (ZIP)",
    printHint:
      "정확한 라벨 크기로 인쇄하려면 100% 배율(“실제 크기” 선택, “페이지 맞춤” 금지)로 인쇄하세요.",
    noResults: "생성된 PDF가 여기에 표시됩니다.",
    tooManyPages: "페이지 한도에 도달했습니다 (배치당 200쪽). 일부 파일을 제거하세요.",
  },
  "zh-cn": {
    platformLabel: "配送平台",
    platformAuto: "自动检测",
    platformOther: "其他 / 自定义",
    platformHint:
      "选择您的电商平台，以便按正确比例识别区域。自动检测会读取 PDF 中的文字。",
    outputSizeLabel: "输出页面尺寸",
    size4x6: "4 × 6 英寸（标签纸卷）",
    size100x150: "100 × 150 毫米",
    size3x5: "3 × 5 英寸",
    size4x4: "4 × 4 英寸",
    sizeA4: "A4",
    sizeCustom: "自定义尺寸",
    widthLabel: "宽度",
    heightLabel: "高度",
    unitMm: "毫米",
    unitIn: "英寸",
    unitLabel: "单位",
    customSizeError: "请输入有效的宽度和高度（10–1000 毫米）。",
    contentLabel: "内容",
    modeLabelOnly: "配送标签",
    modeInvoiceOnly: "发票",
    modeBoth: "标签 + 发票",
    modeHint:
      "每个选定区域都会放到单独的精确尺寸页面上，并按比例缩放以完整放入 — 不拉伸、不裁切。",
    printTip:
      "提示：以 100% 比例打印（不要选择“适应页面”），输出才能保持准确的实际尺寸。",
    uploadTitle: "将 PDF 文件拖放到这里",
    uploadHint: "或点击浏览 — 最多 10 个文件，每个 50 MB",
    uploadPrivacy:
      "所有处理均在您的浏览器中完成，文件绝不会上传到服务器。",
    replacePdf: "添加更多 PDF",
    pagesWord: "页",
    analyzing: "正在分析…",
    analysisFailed: "无法读取此 PDF。",
    detected: "已检测",
    reviewSuggested: "建议复核",
    ready: "就绪",
    reviewPages: "复核页面",
    noFilesYet: "上传 PDF 即可查看页面预览并调整标签区域。",
    batchLimits: "每批最多 10 个文件、200 页。",
    editorTitle: "调整标签与发票区域",
    editorHint:
      "在框内拖动可移动，拖动角点可调整大小。使用下方按钮更改区域类型。",
    page: "页",
    regionType: "区域类型",
    kindLabel: "标签",
    kindInvoice: "发票",
    kindFull: "整页",
    fullPage: "适应整页",
    removeRegion: "移除区域",
    resetRegions: "重置",
    cancel: "取消",
    applySelection: "应用选择",
    sizeHint: "输出页面保持完全相同的比例 — 不拉伸、不裁切。",
    generate: "生成 PDF",
    generating: "正在生成…",
    noRegionForMode:
      "未在任何页面找到匹配区域。请选择其他内容类型或调整区域。",
    sizeRequired: "请先选择有效的输出尺寸。",
    noValidFiles: "请先添加至少一个可读取的 PDF。",
    corruptError: "此 PDF 已损坏或受密码保护，无法处理。",
    cropTooSmall: "所选区域相对于输出页面过小，请调整选择。",
    resultTitle: "您的 PDF",
    downloadAll: "全部下载（ZIP）",
    printHint:
      "以 100% 比例打印（选择“实际大小”，切勿选择“适应页面”），标签尺寸才准确。",
    noResults: "生成的 PDF 将显示在这里。",
    tooManyPages: "已达到页数上限（每批 200 页），请删除部分文件。",
  },
  "zh-tw": {
    platformLabel: "配送平台",
    platformAuto: "自動偵測",
    platformOther: "其他 / 自訂",
    platformHint:
      "選擇您的電商平台，以便以正確比例偵測區域。自動偵測會讀取 PDF 中的文字。",
    outputSizeLabel: "輸出頁面尺寸",
    size4x6: "4 × 6 吋（標籤紙捲）",
    size100x150: "100 × 150 公釐",
    size3x5: "3 × 5 吋",
    size4x4: "4 × 4 吋",
    sizeA4: "A4",
    sizeCustom: "自訂尺寸",
    widthLabel: "寬度",
    heightLabel: "高度",
    unitMm: "公釐",
    unitIn: "吋",
    unitLabel: "單位",
    customSizeError: "請輸入有效的寬度與高度（10–1000 公釐）。",
    contentLabel: "內容",
    modeLabelOnly: "配送標籤",
    modeInvoiceOnly: "發票",
    modeBoth: "標籤 + 發票",
    modeHint:
      "每個選定區域都會放在個別的精確尺寸頁面，並按比例縮放完整放入 — 不拉伸、不裁切。",
    printTip:
      "提示：以 100% 比例列印（請勿選擇「符合頁面」），輸出才能保持準確的實際尺寸。",
    uploadTitle: "將 PDF 檔案拖放到這裡",
    uploadHint: "或點擊瀏覽 — 最多 10 個檔案，每個 50 MB",
    uploadPrivacy:
      "所有處理都在您的瀏覽器中完成，檔案絕不會上傳到伺服器。",
    replacePdf: "加入更多 PDF",
    pagesWord: "頁",
    analyzing: "分析中…",
    analysisFailed: "無法讀取此 PDF。",
    detected: "已偵測",
    reviewSuggested: "建議複核",
    ready: "就緒",
    reviewPages: "複核頁面",
    noFilesYet: "上傳 PDF 即可查看頁面預覽並調整標籤區域。",
    batchLimits: "每批最多 10 個檔案、200 頁。",
    editorTitle: "調整標籤與發票區域",
    editorHint:
      "在框內拖曳可移動，拖曳角落可調整大小。使用下方按鈕變更區域類型。",
    page: "頁",
    regionType: "區域類型",
    kindLabel: "標籤",
    kindInvoice: "發票",
    kindFull: "整頁",
    fullPage: "符合整頁",
    removeRegion: "移除區域",
    resetRegions: "重設",
    cancel: "取消",
    applySelection: "套用選擇",
    sizeHint: "輸出頁面維持完全相同的比例 — 不拉伸、不裁切。",
    generate: "產生 PDF",
    generating: "產生中…",
    noRegionForMode:
      "未在任何頁面找到符合的區域。請選擇其他內容類型或調整區域。",
    sizeRequired: "請先選擇有效的輸出尺寸。",
    noValidFiles: "請先加入至少一個可讀取的 PDF。",
    corruptError: "此 PDF 已損壞或受密碼保護，無法處理。",
    cropTooSmall: "所選區域相對於輸出頁面過小，請調整選擇。",
    resultTitle: "您的 PDF",
    downloadAll: "全部下載（ZIP）",
    printHint:
      "以 100% 比例列印（選擇「實際大小」，請勿選擇「符合頁面」），標籤尺寸才準確。",
    noResults: "產生的 PDF 將顯示在這裡。",
    tooManyPages: "已達到頁數上限（每批 200 頁），請刪除部分檔案。",
  },
  ar: {
    platformLabel: "منصة الشحن",
    platformAuto: "كشف تلقائي",
    platformOther: "أخرى / مخصص",
    platformHint:
      "اختر متجرك الإلكتروني ليتم كشف المناطق بالنِسب الصحيحة. يقرأ الكشف التلقائي النص داخل ملف PDF.",
    outputSizeLabel: "حجم صفحة الإخراج",
    size4x6: "4 × 6 بوصة (لفة ملصقات)",
    size100x150: "100 × 150 مم",
    size3x5: "3 × 5 بوصة",
    size4x4: "4 × 4 بوصة",
    sizeA4: "A4",
    sizeCustom: "حجم مخصص",
    widthLabel: "العرض",
    heightLabel: "الارتفاع",
    unitMm: "مم",
    unitIn: "بوصة",
    unitLabel: "الوحدة",
    customSizeError: "أدخل عرضًا وارتفاعًا صالحين (10–1000 مم).",
    contentLabel: "المحتوى",
    modeLabelOnly: "ملصق الشحن",
    modeInvoiceOnly: "فاتورة",
    modeBoth: "ملصق + فاتورة",
    modeHint:
      "يتم وضع كل منطقة مختارة على صفحتها الخاصة ذات الحجم الدقيق وتكبيرها لتناسبها — دون تمديد أو قص.",
    printTip:
      "نصيحة: اطبع بنسبة 100% (بدون «ملاءمة الصفحة») ليبقى للمخرجات حجمه الفعلي الدقيق.",
    uploadTitle: "أسقط ملفات PDF هنا",
    uploadHint: "أو انقر للاستعراض — حتى 10 ملفات، 50 ميغابايت لكل ملف",
    uploadPrivacy:
      "تتم المعالجة كلها في متصفحك. لا تُرفع ملفاتك إلى خادم أبدًا.",
    replacePdf: "أضف المزيد من ملفات PDF",
    pagesWord: "صفحات",
    analyzing: "جارٍ التحليل…",
    analysisFailed: "تعذّر قراءة ملف PDF هذا.",
    detected: "تم الكشف",
    reviewSuggested: "يوصى بالمراجعة",
    ready: "جاهز",
    reviewPages: "مراجعة الصفحات",
    noFilesYet:
      "ارفع ملفات PDF لعرض معاينات الصفحات وضبط مناطق الملصق.",
    batchLimits: "حد أقصى 10 ملفات و200 صفحة لكل دفعة.",
    editorTitle: "ضبط منطقة الملصق والفاتورة",
    editorHint:
      "اسحب داخل الإطار لتحريكه. اسحب أحد الزوايا لتغيير الحجم. غيّر نوع المنطقة بالأزرار أدناه.",
    page: "صفحة",
    regionType: "نوع المنطقة",
    kindLabel: "ملصق",
    kindInvoice: "فاتورة",
    kindFull: "صفحة كاملة",
    fullPage: "ملاءمة الصفحة كاملة",
    removeRegion: "إزالة المنطقة",
    resetRegions: "إعادة تعيين",
    cancel: "إلغاء",
    applySelection: "تطبيق الاختيار",
    sizeHint: "تحافظ صفحة الإخراج على هذه النسبة الدقيقة — دون تمديد أو قص.",
    generate: "إنشاء PDF",
    generating: "جارٍ الإنشاء…",
    noRegionForMode:
      "لم يتم العثور على منطقة مطابقة في أي صفحة. اختر نوع محتوى آخر أو عدّل المناطق.",
    sizeRequired: "اختر حجم إخراج صالحًا أولًا.",
    noValidFiles: "أضف ملف PDF واحدًا قابلًا للقراءة على الأقل أولًا.",
    corruptError:
      "ملف PDF هذا تالف أو محمي بكلمة مرور ولا يمكن معالجته.",
    cropTooSmall:
      "المنطقة المختارة صغيرة جدًا لصفحة الإخراج. يرجى تعديل الاختيار.",
    resultTitle: "ملفات PDF الخاصة بك",
    downloadAll: "تنزيل الكل (ZIP)",
    printHint:
      "اطبع بنسبة 100% (اختر «الحجم الفعلي» ولا تختار «ملاءمة الصفحة» أبدًا) للحصول على أبعاد ملصق دقيقة.",
    noResults: "ستظهر ملفات PDF التي أنشأتها هنا.",
    tooManyPages: "تم بلوغ حد الصفحات (200 صفحة لكل دفعة). أزل بعض الملفات.",
  },
  bg: {
    platformLabel: "Платформа за доставка",
    platformAuto: "Автоматично откриване",
    platformOther: "Друга / По избор",
    platformHint:
      "Изберете вашия маркетплейс, за да се открият областите с правилните пропорции. Автоматичното откриване чете текста във вашето PDF.",
    outputSizeLabel: "Размер на изходната страница",
    size4x6: "4 × 6 инча (ролка етикети)",
    size100x150: "100 × 150 мм",
    size3x5: "3 × 5 инча",
    size4x4: "4 × 4 инча",
    sizeA4: "A4",
    sizeCustom: "Размер по избор",
    widthLabel: "Ширина",
    heightLabel: "Височина",
    unitMm: "мм",
    unitIn: "инч",
    unitLabel: "Единица",
    customSizeError: "Въведете валидна ширина и височина (10–1000 мм).",
    contentLabel: "Съдържание",
    modeLabelOnly: "Етикет за доставка",
    modeInvoiceOnly: "Фактура",
    modeBoth: "Етикет + фактура",
    modeHint:
      "Всяка избрана област се поставя на собствена страница с точен размер и се мащабира, за да се побере — никога не се разтяга, никога не се отрязва.",
    printTip:
      "Съвет: отпечатвайте с мащаб 100 % (без „побиране в страница“), за да запази изходът точния си физически размер.",
    uploadTitle: "Пуснете PDF файлове тук",
    uploadHint: "или кликнете за избиране — до 10 файла, по 50 MB",
    uploadPrivacy:
      "Всичко се обработва във вашия браузър. Вашите файлове никога не се качват на сървър.",
    replacePdf: "Добавяне на още PDF",
    pagesWord: "страници",
    analyzing: "Анализиране…",
    analysisFailed: "Този PDF не можа да бъде прочетен.",
    detected: "Открито",
    reviewSuggested: "Препоръчва се преглед",
    ready: "Готово",
    reviewPages: "Преглед на страниците",
    noFilesYet:
      "Качете PDF файлове, за да видите прегледите на страниците и да настроите областите на етикета.",
    batchLimits: "До 10 файла и 200 страници на партида.",
    editorTitle: "Настройка на областта за етикет и фактура",
    editorHint:
      "Плъзнете вътре в рамката, за да я преместите. Плъзнете ъгъл, за да промените размера. Сменете вида на областта с бутоните по-долу.",
    page: "Страница",
    regionType: "Вид област",
    kindLabel: "Етикет",
    kindInvoice: "Фактура",
    kindFull: "Цяла страница",
    fullPage: "Побиране на цялата страница",
    removeRegion: "Премахване на област",
    resetRegions: "Нулиране",
    cancel: "Отмяна",
    applySelection: "Прилагане на избора",
    sizeHint:
      "Изходната страница запазва точно това съотношение — без разтягане и без отрязване.",
    generate: "Генериране на PDF",
    generating: "Генериране…",
    noRegionForMode:
      "Няма намерена подходяща област на нито една страница. Изберете друг вид съдържание или настройте областите.",
    sizeRequired: "Първо изберете валиден изходен размер.",
    noValidFiles: "Първо добавете поне един четим PDF.",
    corruptError:
      "Този PDF е повреден или защитен с парола и не може да бъде обработен.",
    cropTooSmall:
      "Избраната област е твърде малка за изходната страница. Моля, настройте избора.",
    resultTitle: "Вашите PDF",
    downloadAll: "Изтегляне на всичко (ZIP)",
    printHint:
      "Отпечатвайте с мащаб 100 % (изберете „истински размер“, никога „побиране в страница“) за точни размери на етикета.",
    noResults: "Вашите генерирани PDF ще се покажат тук.",
    tooManyPages:
      "Достигнат е лимитът от страници (200 страници на партида). Премахнете някои файлове.",
  },
  ca: {
    platformLabel: "Plataforma d’enviament",
    platformAuto: "Detecció automàtica",
    platformOther: "Altra / Personalitzada",
    platformHint:
      "Trieu el vostre marketplace perquè les regions es detectin amb les proporcions correctes. La detecció automàtica llegeix el text del vostre PDF.",
    outputSizeLabel: "Mida de pàgina de sortida",
    size4x6: "4 × 6 in (rotoló d’etiquetes)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 in",
    size4x4: "4 × 4 in",
    sizeA4: "A4",
    sizeCustom: "Mida personalitzada",
    widthLabel: "Amplada",
    heightLabel: "Alçada",
    unitMm: "mm",
    unitIn: "in",
    unitLabel: "Unitat",
    customSizeError: "Introduïu una amplada i una alçada vàlides (10–1000 mm).",
    contentLabel: "Contingut",
    modeLabelOnly: "Etiqueta d’enviament",
    modeInvoiceOnly: "Factura",
    modeBoth: "Etiqueta + Factura",
    modeHint:
      "Cada regió seleccionada es col·loca a la seva pròpia pàgina de mida exacta i s’escala perquè hi capgui — mai s’estira, mai es retalla.",
    printTip:
      "Consell: imprimiu al 100 % d’escala (sense “ajustar a la pàgina”) perquè la sortida conservi la seva mida física exacta.",
    uploadTitle: "Deixeu anar fitxers PDF aquí",
    uploadHint: "o feu clic per examinar — fins a 10 fitxers, 50 MB cadascun",
    uploadPrivacy:
      "Tot es processa al vostre navegador. Els vostres fitxers mai no es pugen a un servidor.",
    replacePdf: "Afegir més PDF",
    pagesWord: "pàgines",
    analyzing: "Analitzant…",
    analysisFailed: "No s’ha pogut llegir aquest PDF.",
    detected: "Detectat",
    reviewSuggested: "Revisió suggerida",
    ready: "Preparat",
    reviewPages: "Revisar pàgines",
    noFilesYet:
      "Pengeu PDF per veure les previsualitzacions de les pàgines i ajustar les àrees de l’etiqueta.",
    batchLimits: "Màxim 10 fitxers i 200 pàgines per lot.",
    editorTitle: "Ajustar l’àrea d’etiqueta i factura",
    editorHint:
      "Arrossegueu dins del quadre per moure’l. Arrossegueu una cantonada per redimensionar. Canvieu el tipus de regió amb els botons de sota.",
    page: "Pàgina",
    regionType: "Tipus de regió",
    kindLabel: "Etiqueta",
    kindInvoice: "Factura",
    kindFull: "Pàgina completa",
    fullPage: "Ajustar pàgina completa",
    removeRegion: "Eliminar regió",
    resetRegions: "Restablir",
    cancel: "Cancel·lar",
    applySelection: "Aplicar selecció",
    sizeHint:
      "La pàgina de sortida manté aquesta proporció exacta — sense estirar, sense retallar.",
    generate: "Generar PDF",
    generating: "Generant…",
    noRegionForMode:
      "No s’ha trobat cap regió coincident a les pàgines. Trieu un altre tipus de contingut o ajusteu les regions.",
    sizeRequired: "Trieu primer una mida de sortida vàlida.",
    noValidFiles: "Afegiu almenys un PDF legible primer.",
    corruptError:
      "Aquest PDF està malmès o protegit amb contrasenya i no es pot processar.",
    cropTooSmall:
      "La regió seleccionada és massa petita per a la pàgina de sortida. Ajusteu la selecció.",
    resultTitle: "Els vostres PDF",
    downloadAll: "Descarregar-ho tot (ZIP)",
    printHint:
      "Imprimiu al 100 % d’escala (trieu “Mida real”, mai “Ajustar a la pàgina”) per obtenir les dimensions exactes de l’etiqueta.",
    noResults: "Els vostres PDF generats apareixeran aquí.",
    tooManyPages:
      "S’ha arribat al límit de pàgines (200 pàgines per lot). Elimineu alguns fitxers.",
  },
  nl: {
    platformLabel: "Verzendplatform",
    platformAuto: "Automatisch detecteren",
    platformOther: "Overig / Aangepast",
    platformHint:
      "Kies uw marketplace zodat de gebieden met de juiste verhoudingen worden gedetecteerd. Automatisch detecteren leest de tekst in uw PDF.",
    outputSizeLabel: "Uitvoerformaat pagina",
    size4x6: "4 × 6 in (etikettenrol)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 in",
    size4x4: "4 × 4 in",
    sizeA4: "A4",
    sizeCustom: "Aangepast formaat",
    widthLabel: "Breedte",
    heightLabel: "Hoogte",
    unitMm: "mm",
    unitIn: "in",
    unitLabel: "Eenheid",
    customSizeError: "Voer een geldige breedte en hoogte in (10–1000 mm).",
    contentLabel: "Inhoud",
    modeLabelOnly: "Verzendlabel",
    modeInvoiceOnly: "Factuur",
    modeBoth: "Label + Factuur",
    modeHint:
      "Elk geselecteerd gebied wordt op zijn eigen pagina met exact formaat geplaatst en geschaald om te passen — nooit uitgerekt, nooit bijgesneden.",
    printTip:
      "Tip: print op 100 % schaal (zonder “passen op pagina”) zodat de uitvoer exact hetzelfde fysieke formaat behoudt.",
    uploadTitle: "Zet PDF-bestanden hier neer",
    uploadHint: "of klik om te bladeren — maximaal 10 bestanden, elk 50 MB",
    uploadPrivacy:
      "Alles wordt in uw browser verwerkt. Uw bestanden worden nooit naar een server geüpload.",
    replacePdf: "Meer PDF’s toevoegen",
    pagesWord: "pagina’s",
    analyzing: "Analyseren…",
    analysisFailed: "Deze PDF kon niet worden gelezen.",
    detected: "Gedetecteerd",
    reviewSuggested: "Controle aanbevolen",
    ready: "Gereed",
    reviewPages: "Pagina’s controleren",
    noFilesYet:
      "Upload PDF’s om paginavoorbeelden te zien en de labelgebieden aan te passen.",
    batchLimits: "Maximaal 10 bestanden en 200 pagina’s per batch.",
    editorTitle: "Label- en factuurgebied aanpassen",
    editorHint:
      "Sleep binnen het kader om te verplaatsen. Sleep een hoek om te schalen. Wijzig het gebiedstype met de knoppen hieronder.",
    page: "Pagina",
    regionType: "Gebiedstype",
    kindLabel: "Label",
    kindInvoice: "Factuur",
    kindFull: "Hele pagina",
    fullPage: "Hele pagina passend maken",
    removeRegion: "Gebied verwijderen",
    resetRegions: "Opnieuw instellen",
    cancel: "Annuleren",
    applySelection: "Selectie toepassen",
    sizeHint:
      "De uitvoerpagina behoudt precies deze verhouding — geen uitrekking, geen bijsnijden.",
    generate: "PDF genereren",
    generating: "Genereren…",
    noRegionForMode:
      "Geen overeenkomend gebied gevonden op een van de pagina’s. Kies een ander inhoudstype of pas de gebieden aan.",
    sizeRequired: "Kies eerst een geldig uitvoerformaat.",
    noValidFiles: "Voeg eerst minstens één leesbare PDF toe.",
    corruptError:
      "Deze PDF is beschadigd of met een wachtwoord beveiligd en kan niet worden verwerkt.",
    cropTooSmall:
      "Het geselecteerde gebied is te klein voor de uitvoerpagina. Pas de selectie aan.",
    resultTitle: "Uw PDF’s",
    downloadAll: "Alles downloaden (ZIP)",
    printHint:
      "Print op 100 % schaal (kies “werkelijk formaat”, nooit “passen op pagina”) voor exacte etiketmaten.",
    noResults: "Uw gegenereerde PDF’s verschijnen hier.",
    tooManyPages:
      "Paginagrens bereikt (200 pagina’s per batch). Verwijder enkele bestanden.",
  },
  el: {
    platformLabel: "Πλατφόρμα αποστολής",
    platformAuto: "Αυτόματη ανίχνευση",
    platformOther: "Άλλη / Προσαρμοσμένη",
    platformHint:
      "Επιλέξτε το marketplace σας ώστε οι περιοχές να ανιχνευθούν με τις σωστές αναλογίες. Η αυτόματη ανίχνευση διαβάζει το κείμενο του PDF σας.",
    outputSizeLabel: "Μέγεθος σελίδας εξόδου",
    size4x6: "4 × 6 in (ρολό ετικετών)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 in",
    size4x4: "4 × 4 in",
    sizeA4: "A4",
    sizeCustom: "Προσαρμοσμένο μέγεθος",
    widthLabel: "Πλάτος",
    heightLabel: "Ύψος",
    unitMm: "mm",
    unitIn: "in",
    unitLabel: "Μονάδα",
    customSizeError: "Εισαγάγετε έγκυρο πλάτος και ύψος (10–1000 mm).",
    contentLabel: "Περιεχόμενο",
    modeLabelOnly: "Ετικέτα αποστολής",
    modeInvoiceOnly: "Τιμολόγιο",
    modeBoth: "Ετικέτα + Τιμολόγιο",
    modeHint:
      "Κάθε επιλεγμένη περιοχή τοποθετείται στη δική της σελίδα ακριβούς μεγέθους και κλιμακώνεται ώστε να χωρά — χωρίς τέντωμα, χωρίς κοπή.",
    printTip:
      "Συμβουλή: εκτυπώστε σε κλίμακα 100 % (χωρίς «προσαρμογή στη σελίδα») ώστε το αποτέλεσμα να διατηρήσει το ακριβές φυσικό του μέγεθος.",
    uploadTitle: "Αποθέστε αρχεία PDF εδώ",
    uploadHint: "ή κάντε κλικ για περιήγηση — έως 10 αρχεία, 50 MB το καθένα",
    uploadPrivacy:
      "Όλα επεξεργάζονται στο πρόγραμμα περιήγησής σας. Τα αρχεία σας δεν ανεβαίνουν ποτέ σε διακομιστή.",
    replacePdf: "Προσθήκη περισσότερων PDF",
    pagesWord: "σελίδες",
    analyzing: "Ανάλυση…",
    analysisFailed: "Δεν ήταν δυνατή η ανάγνωση αυτού του PDF.",
    detected: "Ανιχνεύθηκε",
    reviewSuggested: "Προτείνεται έλεγχος",
    ready: "Έτοιμο",
    reviewPages: "Έλεγχος σελίδων",
    noFilesYet:
      "Ανεβάστε PDF για να δείτε τις προεπισκοπήσεις των σελίδων και να προσαρμόσετε τις περιοχές της ετικέτας.",
    batchLimits: "Έως 10 αρχεία και 200 σελίδες ανά παρτίδα.",
    editorTitle: "Προσαρμογή περιοχής ετικέτας και τιμολογίου",
    editorHint:
      "Σύρετε μέσα στο πλαίσιο για μετακίνηση. Σύρετε μια γωνία για αλλαγή μεγέθους. Αλλάξτε τον τύπο της περιοχής με τα κουμπιά παρακάτω.",
    page: "Σελίδα",
    regionType: "Τύπος περιοχής",
    kindLabel: "Ετικέτα",
    kindInvoice: "Τιμολόγιο",
    kindFull: "Ολόκληρη σελίδα",
    fullPage: "Προσαρμογή ολόκληρης σελίδας",
    removeRegion: "Αφαίρεση περιοχής",
    resetRegions: "Επαναφορά",
    cancel: "Ακύρωση",
    applySelection: "Εφαρμογή επιλογής",
    sizeHint:
      "Η σελίδα εξόδου διατηρεί αυτήν ακριβώς την αναλογία — χωρίς τέντωμα, χωρίς κοπή.",
    generate: "Δημιουργία PDF",
    generating: "Δημιουργία…",
    noRegionForMode:
      "Δεν βρέθηκε κατάλληλη περιοχή σε καμία σελίδα. Επιλέξτε άλλο είδος περιεχομένου ή προσαρμόστε τις περιοχές.",
    sizeRequired: "Επιλέξτε πρώτα έγκυρο μέγεθος εξόδου.",
    noValidFiles: "Προσθέστε πρώτα τουλάχιστον ένα αναγνώσιμο PDF.",
    corruptError:
      "Αυτό το PDF είναι κατεστραμμένο ή προστατευμένο με κωδικό και δεν μπορεί να επεξεργαστεί.",
    cropTooSmall:
      "Η επιλεγμένη περιοχή είναι πολύ μικρή για τη σελίδα εξόδου. Παρακαλώ προσαρμόστε την επιλογή.",
    resultTitle: "Τα PDF σας",
    downloadAll: "Λήψη όλων (ZIP)",
    printHint:
      "Εκτυπώστε σε κλίμακα 100 % (επιλέξτε «πραγματικό μέγεθος», ποτέ «προσαρμογή στη σελίδα») για ακριβείς διαστάσεις ετικέτας.",
    noResults: "Τα δημιουργημένα PDF σας θα εμφανιστούν εδώ.",
    tooManyPages:
      "Έφτασε το όριο σελίδων (200 σελίδες ανά παρτίδα). Αφαιρέστε ορισμένα αρχεία.",
  },
  id: {
    platformLabel: "Platform pengiriman",
    platformAuto: "Deteksi otomatis",
    platformOther: "Lainnya / Kustom",
    platformHint:
      "Pilih marketplace Anda agar area terdeteksi dengan proporsi yang tepat. Deteksi otomatis membaca teks di PDF Anda.",
    outputSizeLabel: "Ukuran halaman keluaran",
    size4x6: "4 × 6 in (rol label)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 in",
    size4x4: "4 × 4 in",
    sizeA4: "A4",
    sizeCustom: "Ukuran kustom",
    widthLabel: "Lebar",
    heightLabel: "Tinggi",
    unitMm: "mm",
    unitIn: "in",
    unitLabel: "Satuan",
    customSizeError: "Masukkan lebar dan tinggi yang valid (10–1000 mm).",
    contentLabel: "Konten",
    modeLabelOnly: "Label pengiriman",
    modeInvoiceOnly: "Faktur",
    modeBoth: "Label + Faktur",
    modeHint:
      "Setiap area yang dipilih ditempatkan di halaman berukuran tepat tersendiri dan diskalakan agar pas — tidak pernah teregang, tidak pernah terpotong.",
    printTip:
      "Tips: cetak pada skala 100% (tanpa “paskan ke halaman”) agar keluaran mempertahankan ukuran fisik yang tepat.",
    uploadTitle: "Letakkan file PDF di sini",
    uploadHint: "atau klik untuk memilih — hingga 10 file, masing-masing 50 MB",
    uploadPrivacy:
      "Semua diproses di browser Anda. File Anda tidak pernah diunggah ke server.",
    replacePdf: "Tambahkan PDF lain",
    pagesWord: "halaman",
    analyzing: "Menganalisis…",
    analysisFailed: "PDF ini tidak dapat dibaca.",
    detected: "Terdeteksi",
    reviewSuggested: "Perlu ditinjau",
    ready: "Siap",
    reviewPages: "Tinjau halaman",
    noFilesYet:
      "Unggah PDF untuk melihat pratinjau halaman dan menyesuaikan area label.",
    batchLimits: "Maksimal 10 file dan 200 halaman per batch.",
    editorTitle: "Sesuaikan area label & faktur",
    editorHint:
      "Geser di dalam kotak untuk memindahkannya. Seret sudut untuk mengubah ukuran. Ubah jenis area dengan tombol di bawah.",
    page: "Halaman",
    regionType: "Jenis area",
    kindLabel: "Label",
    kindInvoice: "Faktur",
    kindFull: "Halaman penuh",
    fullPage: "Paskan halaman penuh",
    removeRegion: "Hapus area",
    resetRegions: "Atur ulang",
    cancel: "Batal",
    applySelection: "Terapkan pilihan",
    sizeHint:
      "Halaman keluaran mempertahankan rasio tepat ini — tanpa peregangan, tanpa pemotongan.",
    generate: "Buat PDF",
    generating: "Membuat…",
    noRegionForMode:
      "Tidak ditemukan area yang cocok di halaman mana pun. Pilih jenis konten lain atau sesuaikan area.",
    sizeRequired: "Pilih dulu ukuran keluaran yang valid.",
    noValidFiles: "Tambahkan setidaknya satu PDF yang dapat dibaca terlebih dahulu.",
    corruptError:
      "PDF ini rusak atau dilindungi kata sandi dan tidak dapat diproses.",
    cropTooSmall:
      "Area yang dipilih terlalu kecil untuk halaman keluaran. Silakan sesuaikan pilihan.",
    resultTitle: "PDF Anda",
    downloadAll: "Unduh semua (ZIP)",
    printHint:
      "Cetak pada skala 100% (pilih “Ukuran sebenarnya”, jangan pernah “Paskan ke halaman”) untuk dimensi label yang tepat.",
    noResults: "PDF yang Anda buat akan muncul di sini.",
    tooManyPages:
      "Batas halaman tercapai (200 halaman per batch). Hapus beberapa file.",
  },
  ms: {
    platformLabel: "Platform penghantaran",
    platformAuto: "Kesan automatik",
    platformOther: "Lain / Tersuai",
    platformHint:
      "Pilih marketplace anda supaya kawasan dikesan dengan nisbah yang betul. Kesan automatik membaca teks dalam PDF anda.",
    outputSizeLabel: "Saiz halaman output",
    size4x6: "4 × 6 in (rol label)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 in",
    size4x4: "4 × 4 in",
    sizeA4: "A4",
    sizeCustom: "Saiz tersuai",
    widthLabel: "Lebar",
    heightLabel: "Tinggi",
    unitMm: "mm",
    unitIn: "in",
    unitLabel: "Unit",
    customSizeError: "Masukkan lebar dan tinggi yang sah (10–1000 mm).",
    contentLabel: "Kandungan",
    modeLabelOnly: "Label penghantaran",
    modeInvoiceOnly: "Invois",
    modeBoth: "Label + Invois",
    modeHint:
      "Setiap kawasan yang dipilih diletakkan pada halaman bersaiz tepatnya sendiri dan diskala agar muat — tidak pernah diregang, tidak pernah dipotong.",
    printTip:
      "Tip: cetak pada skala 100% (tanpa “muatkan ke halaman”) supaya output mengekalkan saiz fizikal yang tepat.",
    uploadTitle: "Letakkan fail PDF di sini",
    uploadHint: "atau klik untuk melayari — sehingga 10 fail, 50 MB setiap satu",
    uploadPrivacy:
      "Semua diproses dalam pelayar anda. Fail anda tidak pernah dimuat naik ke pelayan.",
    replacePdf: "Tambah PDF lagi",
    pagesWord: "halaman",
    analyzing: "Menganalisis…",
    analysisFailed: "PDF ini tidak dapat dibaca.",
    detected: "Dikesan",
    reviewSuggested: "Semakan disyorkan",
    ready: "Sedia",
    reviewPages: "Semak halaman",
    noFilesYet:
      "Muat naik PDF untuk melihat pratonton halaman dan melaraskan kawasan label.",
    batchLimits: "Maksimum 10 fail dan 200 halaman setiap batch.",
    editorTitle: "Laraskan kawasan label & invois",
    editorHint:
      "Seret di dalam kotak untuk mengalihkannya. Seret sudut untuk mengubah saiz. Tukar jenis kawasan dengan butang di bawah.",
    page: "Halaman",
    regionType: "Jenis kawasan",
    kindLabel: "Label",
    kindInvoice: "Invois",
    kindFull: "Halaman penuh",
    fullPage: "Muatkan halaman penuh",
    removeRegion: "Buang kawasan",
    resetRegions: "Set semula",
    cancel: "Batal",
    applySelection: "Gunakan pilihan",
    sizeHint:
      "Halaman output mengekalkan nisbah tepat ini — tanpa peregangan, tanpa pemotongan.",
    generate: "Jana PDF",
    generating: "Menjana…",
    noRegionForMode:
      "Tiada kawasan sepadan dijumpai pada mana-mana halaman. Pilih jenis kandungan lain atau laraskan kawasan.",
    sizeRequired: "Pilih saiz output yang sah dahulu.",
    noValidFiles: "Tambah sekurang-kurangnya satu PDF yang boleh dibaca dahulu.",
    corruptError:
      "PDF ini rosak atau dilindungi kata laluan dan tidak boleh diproses.",
    cropTooSmall:
      "Kawasan yang dipilih terlalu kecil untuk halaman output. Sila laraskan pilihan.",
    resultTitle: "PDF anda",
    downloadAll: "Muat turun semua (ZIP)",
    printHint:
      "Cetak pada skala 100% (pilih “Saiz sebenar”, jangan sekali-kali “Muatkan ke halaman”) untuk dimensi label yang tepat.",
    noResults: "PDF yang anda jana akan muncul di sini.",
    tooManyPages:
      "Had halaman dicapai (200 halaman setiap batch). Buang beberapa fail.",
  },
  pl: {
    platformLabel: "Platforma wysyłkowa",
    platformAuto: "Automatyczne wykrywanie",
    platformOther: "Inna / Niestandardowa",
    platformHint:
      "Wybierz swój marketplace, aby obszary były wykrywane z prawidłowymi proporcjami. Automatyczne wykrywanie odczytuje tekst w Twoim PDF.",
    outputSizeLabel: "Rozmiar strony wyjściowej",
    size4x6: "4 × 6 cali (rolka etykiet)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 cali",
    size4x4: "4 × 4 cale",
    sizeA4: "A4",
    sizeCustom: "Rozmiar niestandardowy",
    widthLabel: "Szerokość",
    heightLabel: "Wysokość",
    unitMm: "mm",
    unitIn: "cal",
    unitLabel: "Jednostka",
    customSizeError: "Wprowadź prawidłową szerokość i wysokość (10–1000 mm).",
    contentLabel: "Treść",
    modeLabelOnly: "Etykieta wysyłkowa",
    modeInvoiceOnly: "Faktura",
    modeBoth: "Etykieta + Faktura",
    modeHint:
      "Każdy wybrany obszar trafia na osobną stronę o dokładnym rozmiarze i jest skalowany, aby się zmieścił — bez rozciągania i bez przycinania.",
    printTip:
      "Wskazówka: drukuj w skali 100 % (bez “dopasuj do strony”), aby wydruk zachował dokładny rozmiar fizyczny.",
    uploadTitle: "Upuść pliki PDF tutaj",
    uploadHint: "lub kliknij, aby przeglądać — maksymalnie 10 plików, po 50 MB",
    uploadPrivacy:
      "Wszystko jest przetwarzane w Twojej przeglądarce. Twoje pliki nigdy nie są wysyłane na serwer.",
    replacePdf: "Dodaj więcej PDF",
    pagesWord: "stron",
    analyzing: "Analizowanie…",
    analysisFailed: "Nie udało się odczytać tego PDF.",
    detected: "Wykryto",
    reviewSuggested: "Zalecany przegląd",
    ready: "Gotowe",
    reviewPages: "Przejrzyj strony",
    noFilesYet:
      "Wgraj pliki PDF, aby zobaczyć podglądy stron i dostosować obszary etykiet.",
    batchLimits: "Maksymalnie 10 plików i 200 stron na partię.",
    editorTitle: "Dostosuj obszar etykiety i faktury",
    editorHint:
      "Przeciągnij wewnątrz ramki, aby ją przesunąć. Przeciągnij róg, aby zmienić rozmiar. Zmień typ obszaru przyciskami poniżej.",
    page: "Strona",
    regionType: "Typ obszaru",
    kindLabel: "Etykieta",
    kindInvoice: "Faktura",
    kindFull: "Cała strona",
    fullPage: "Dopasuj całą stronę",
    removeRegion: "Usuń obszar",
    resetRegions: "Resetuj",
    cancel: "Anuluj",
    applySelection: "Zastosuj zaznaczenie",
    sizeHint:
      "Strona wyjściowa zachowuje dokładnie te proporcje — bez rozciągania i bez przycinania.",
    generate: "Generuj PDF",
    generating: "Generowanie…",
    noRegionForMode:
      "Nie znaleziono pasującego obszaru na żadnej stronie. Wybierz inny typ treści lub dostosuj obszary.",
    sizeRequired: "Najpierw wybierz prawidłowy rozmiar wyjściowy.",
    noValidFiles: "Najpierw dodaj przynajmniej jeden czytelny plik PDF.",
    corruptError:
      "Ten plik PDF jest uszkodzony lub chroniony hasłem i nie może być przetworzony.",
    cropTooSmall:
      "Wybrany obszar jest zbyt mały dla strony wyjściowej. Dostosuj zaznaczenie.",
    resultTitle: "Twoje PDF",
    downloadAll: "Pobierz wszystko (ZIP)",
    printHint:
      "Drukuj w skali 100 % (wybierz “rzeczywisty rozmiar”, nigdy “dopasuj do strony”), aby etykiety miały dokładne wymiary.",
    noResults: "Twoje wygenerowane PDF pojawią się tutaj.",
    tooManyPages:
      "Osiągnięto limit stron (200 stron na partię). Usuń część plików.",
  },
  sv: {
    platformLabel: "Fraktplattform",
    platformAuto: "Automatisk identifiering",
    platformOther: "Annan / Anpassad",
    platformHint:
      "Välj din marknadsplats så att områdena identifieras med rätt proportioner. Automatisk identifiering läser texten i ditt PDF.",
    outputSizeLabel: "Utskriftsstorlek för sidan",
    size4x6: "4 × 6 tum (etikettrulle)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 tum",
    size4x4: "4 × 4 tum",
    sizeA4: "A4",
    sizeCustom: "Anpassad storlek",
    widthLabel: "Bredd",
    heightLabel: "Höjd",
    unitMm: "mm",
    unitIn: "tum",
    unitLabel: "Enhet",
    customSizeError: "Ange en giltig bredd och höjd (10–1000 mm).",
    contentLabel: "Innehåll",
    modeLabelOnly: "Fraktetikett",
    modeInvoiceOnly: "Faktura",
    modeBoth: "Etikett + Faktura",
    modeHint:
      "Varje valt område placeras på en egen sida med exakt storlek och skalas för att passa — aldrig uttänjt, aldrig beskuret.",
    printTip:
      "Tips: skriv ut i skala 100 % (utan “anpassa till sidan”) så behåller utskriften sin exakta fysiska storlek.",
    uploadTitle: "Släpp PDF-filer här",
    uploadHint: "eller klicka för att bläddra — upp till 10 filer, 50 MB vardera",
    uploadPrivacy:
      "Allt behandlas i din webbläsare. Dina filer laddas aldrig upp till en server.",
    replacePdf: "Lägg till fler PDF-filer",
    pagesWord: "sidor",
    analyzing: "Analyserar…",
    analysisFailed: "Kunde inte läsa denna PDF.",
    detected: "Identifierad",
    reviewSuggested: "Granskning rekommenderas",
    ready: "Klar",
    reviewPages: "Granska sidor",
    noFilesYet:
      "Ladda upp PDF-filer för att se sidförhandsvisningar och justera etikettområdena.",
    batchLimits: "Högst 10 filer och 200 sidor per batch.",
    editorTitle: "Justera etikett- och fakturaområdet",
    editorHint:
      "Dra i rutan för att flytta den. Dra i ett hörn för att ändra storlek. Ändra områdestyp med knapparna nedan.",
    page: "Sida",
    regionType: "Områdestyp",
    kindLabel: "Etikett",
    kindInvoice: "Faktura",
    kindFull: "Hela sidan",
    fullPage: "Anpassa hela sidan",
    removeRegion: "Ta bort område",
    resetRegions: "Återställ",
    cancel: "Avbryt",
    applySelection: "Verkställ val",
    sizeHint:
      "Utskriftssidan behåller denna exakta proportion — ingen uttänjning, ingen beskärning.",
    generate: "Skapa PDF",
    generating: "Skapar…",
    noRegionForMode:
      "Inget matchande område hittades på någon sida. Välj en annan innehållstyp eller justera områdena.",
    sizeRequired: "Välj först en giltig utskriftsstorlek.",
    noValidFiles: "Lägg till minst en läsbar PDF först.",
    corruptError:
      "Denna PDF är skadad eller lösenordsskyddad och kan inte behandlas.",
    cropTooSmall:
      "Det valda området är för litet för utskriftssidan. Justera valet.",
    resultTitle: "Dina PDF-filer",
    downloadAll: "Ladda ner allt (ZIP)",
    printHint:
      "Skriv ut i skala 100 % (välj “verklig storlek”, aldrig “anpassa till sidan”) för exakta etikettmått.",
    noResults: "Dina skapade PDF-filer visas här.",
    tooManyPages:
      "Sidgränsen nåddes (200 sidor per batch). Ta bort några filer.",
  },
  th: {
    platformLabel: "แพลตฟอร์มจัดส่ง",
    platformAuto: "ตรวจจับอัตโนมัติ",
    platformOther: "อื่น ๆ / กำหนดเอง",
    platformHint:
      "เลือกตลาดของคุณเพื่อให้ตรวจจับพื้นที่ด้วยสัดส่วนที่ถูกต้อง การตรวจจับอัตโนมัติจะอ่านข้อความใน PDF ของคุณ",
    outputSizeLabel: "ขนาดหน้าผลลัพธ์",
    size4x6: "4 × 6 นิ้ว (ม้วนป้าย)",
    size100x150: "100 × 150 มม.",
    size3x5: "3 × 5 นิ้ว",
    size4x4: "4 × 4 นิ้ว",
    sizeA4: "A4",
    sizeCustom: "ขนาดกำหนดเอง",
    widthLabel: "ความกว้าง",
    heightLabel: "ความสูง",
    unitMm: "มม.",
    unitIn: "นิ้ว",
    unitLabel: "หน่วย",
    customSizeError: "กรอกความกว้างและความสูงที่ถูกต้อง (10–1000 มม.)",
    contentLabel: "เนื้อหา",
    modeLabelOnly: "ป้ายจัดส่ง",
    modeInvoiceOnly: "ใบแจ้งหนี้",
    modeBoth: "ป้าย + ใบแจ้งหนี้",
    modeHint:
      "พื้นที่ที่เลือกแต่ละส่วนจะถูกวางบนหน้าขนาดพอดีของตัวเองและปรับสัดส่วนให้พอดี — ไม่ยืด ไม่ตัด",
    printTip:
      "เคล็ดลับ: พิมพ์ที่สเกล 100% (ไม่ต้องเลือก “พอดีกับหน้า”) เพื่อให้ผลลัพธ์คงขนาดจริงไว้",
    uploadTitle: "วางไฟล์ PDF ที่นี่",
    uploadHint: "หรือคลิกเพื่อเลือกไฟล์ — สูงสุด 10 ไฟล์ ไฟล์ละ 50 MB",
    uploadPrivacy:
      "ประมวลผลในเบราว์เซอร์ของคุณเท่านั้น ไฟล์ของคุณจะไม่ถูกอัปโหลดไปยังเซิร์ฟเวอร์",
    replacePdf: "เพิ่ม PDF อีก",
    pagesWord: "หน้า",
    analyzing: "กำลังวิเคราะห์…",
    analysisFailed: "ไม่สามารถอ่าน PDF นี้ได้",
    detected: "ตรวจพบ",
    reviewSuggested: "แนะนำให้ตรวจสอบ",
    ready: "พร้อม",
    reviewPages: "ตรวจสอบหน้า",
    noFilesYet: "อัปโหลด PDF เพื่อดูตัวอย่างหน้าและปรับพื้นที่ป้าย",
    batchLimits: "สูงสุด 10 ไฟล์ และ 200 หน้าต่อชุด",
    editorTitle: "ปรับพื้นที่ป้ายและใบแจ้งหนี้",
    editorHint:
      "ลากภายในกล่องเพื่อเลื่อน ลากมุมเพื่อเปลี่ยนขนาด และเปลี่ยนประเภทพื้นที่ด้วยปุ่มด้านล่าง",
    page: "หน้า",
    regionType: "ประเภทพื้นที่",
    kindLabel: "ป้าย",
    kindInvoice: "ใบแจ้งหนี้",
    kindFull: "ทั้งหน้า",
    fullPage: "พอดีทั้งหน้า",
    removeRegion: "ลบพื้นที่",
    resetRegions: "รีเซ็ต",
    cancel: "ยกเลิก",
    applySelection: "ใช้การเลือก",
    sizeHint: "หน้าผลลัพธ์จะคงสัดส่วนนี้ไว้เป๊ะ — ไม่ยืด ไม่ตัด",
    generate: "สร้าง PDF",
    generating: "กำลังสร้าง…",
    noRegionForMode:
      "ไม่พบพื้นที่ที่ตรงกันในหน้าใดเลย เลือกประเภทเนื้อหาอื่นหรือปรับพื้นที่",
    sizeRequired: "เลือกขนาดผลลัพธ์ที่ใช้ได้ก่อน",
    noValidFiles: "เพิ่ม PDF ที่อ่านได้อย่างน้อยหนึ่งไฟล์ก่อน",
    corruptError: "PDF นี้เสียหายหรือถูกรหัสผ่านจึงประมวลผลไม่ได้",
    cropTooSmall: "พื้นที่ที่เลือกเล็กเกินไปสำหรับหน้าผลลัพธ์ โปรดปรับการเลือก",
    resultTitle: "PDF ของคุณ",
    downloadAll: "ดาวน์โหลดทั้งหมด (ZIP)",
    printHint:
      "พิมพ์ที่สเกล 100% (เลือก “ขนาดจริง” ห้ามเลือก “พอดีกับหน้า”) เพื่อให้ขนาดป้ายถูกต้อง",
    noResults: "PDF ที่คุณสร้างจะปรากฏที่นี่",
    tooManyPages: "ถึงขีดจำกัดหน้าแล้ว (200 หน้าต่อชุด) ลบไฟล์บางส่วนออก",
  },
  tr: {
    platformLabel: "Kargo platformu",
    platformAuto: "Otomatik algılama",
    platformOther: "Diğer / Özel",
    platformHint:
      "Bölgelerin doğru oranlarda algılanması için pazaryerinizi seçin. Otomatik algılama, PDF içindeki metni okur.",
    outputSizeLabel: "Çıktı sayfa boyutu",
    size4x6: "4 × 6 in (etiket rulosu)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 in",
    size4x4: "4 × 4 in",
    sizeA4: "A4",
    sizeCustom: "Özel boyut",
    widthLabel: "Genişlik",
    heightLabel: "Yükseklik",
    unitMm: "mm",
    unitIn: "in",
    unitLabel: "Birim",
    customSizeError: "Geçerli bir genişlik ve yükseklik girin (10–1000 mm).",
    contentLabel: "İçerik",
    modeLabelOnly: "Kargo etiketi",
    modeInvoiceOnly: "Fatura",
    modeBoth: "Etiket + Fatura",
    modeHint:
      "Her seçilen bölge, kendi tam ölçülü sayfasına yerleştirilir ve sığacak şekilde ölçeklenir — asla gerilmez, asla kesilmez.",
    printTip:
      "İpucu: Çıktının tam fiziksel ölçüsünü koruması için %100 ölçekle yazdırın (“sayfaya sığdır” seçmeden).",
    uploadTitle: "PDF dosyalarını buraya bırakın",
    uploadHint: "veya göz atmak için tıklayın — en fazla 10 dosya, her biri 50 MB",
    uploadPrivacy:
      "Her şey tarayıcınızda işlenir. Dosyalarınız asla bir sunucuya yüklenmez.",
    replacePdf: "Daha fazla PDF ekle",
    pagesWord: "sayfa",
    analyzing: "Analiz ediliyor…",
    analysisFailed: "Bu PDF okunamadı.",
    detected: "Algılandı",
    reviewSuggested: "İnceleme önerilir",
    ready: "Hazır",
    reviewPages: "Sayfaları incele",
    noFilesYet:
      "Sayfa önizlemelerini görmek ve etiket alanlarını ayarlamak için PDF yükleyin.",
    batchLimits: "Parti başına en fazla 10 dosya ve 200 sayfa.",
    editorTitle: "Etiket ve fatura alanını ayarla",
    editorHint:
      "Taşımak için kutunun içine sürükleyin. Boyutlandırmak için bir köşeye sürükleyin. Alan türünü aşağıdaki düğmelerle değiştirin.",
    page: "Sayfa",
    regionType: "Alan türü",
    kindLabel: "Etiket",
    kindInvoice: "Fatura",
    kindFull: "Tüm sayfa",
    fullPage: "Tüm sayfayı sığdır",
    removeRegion: "Alanı kaldır",
    resetRegions: "Sıfırla",
    cancel: "İptal",
    applySelection: "Seçimi uygula",
    sizeHint: "Çıktı sayfası bu tam oranı korur — gerilme yok, kesme yok.",
    generate: "PDF oluştur",
    generating: "Oluşturuluyor…",
    noRegionForMode:
      "Hiçbir sayfada eşleşen bölge bulunamadı. Başka bir içerik türü seçin veya alanları ayarlayın.",
    sizeRequired: "Önce geçerli bir çıktı boyutu seçin.",
    noValidFiles: "Önce en az bir okunabilir PDF ekleyin.",
    corruptError: "Bu PDF hasarlı veya parola korumalı ve işlenemiyor.",
    cropTooSmall:
      "Seçilen bölge çıktı sayfası için çok küçük. Lütfen seçimi ayarlayın.",
    resultTitle: "PDF’leriniz",
    downloadAll: "Tümünü indir (ZIP)",
    printHint:
      "Tam etiket ölçüleri için %100 ölçekle yazdırın (“gerçek boyut”u seçin, asla “sayfaya sığdır” demeyin).",
    noResults: "Oluşturduğunuz PDF’ler burada görünecek.",
    tooManyPages:
      "Sayfa sınırına ulaşıldı (parti başına 200 sayfa). Bazı dosyaları kaldırın.",
  },
  uk: {
    platformLabel: "Платформа доставки",
    platformAuto: "Автовизначення",
    platformOther: "Інша / Користувацька",
    platformHint:
      "Виберіть маркетплейс, щоб області визначалися з правильними пропорціями. Автовизначення зчитує текст у вашому PDF.",
    outputSizeLabel: "Розмір сторінки виведення",
    size4x6: "4 × 6 дюймів (рулон етикеток)",
    size100x150: "100 × 150 мм",
    size3x5: "3 × 5 дюймів",
    size4x4: "4 × 4 дюйма",
    sizeA4: "A4",
    sizeCustom: "Користувацький розмір",
    widthLabel: "Ширина",
    heightLabel: "Висота",
    unitMm: "мм",
    unitIn: "дюйм",
    unitLabel: "Одиниця",
    customSizeError: "Введіть допустиму ширину та висоту (10–1000 мм).",
    contentLabel: "Вміст",
    modeLabelOnly: "Товарна етикетка",
    modeInvoiceOnly: "Накладна",
    modeBoth: "Етикетка + накладна",
    modeHint:
      "Кожна вибрана область розміщується на окремій сторінці точного розміру й масштабується за пропорціями — без розтягнення та обрізання.",
    printTip:
      "Порада: друкуйте з масштабом 100 % (без «підгонки під сторінку»), щоб виведення зберегло точний фізичний розмір.",
    uploadTitle: "Перетягніть PDF-файли сюди",
    uploadHint: "або натисніть, щоб вибрати — до 10 файлів, по 50 МБ",
    uploadPrivacy:
      "Усе обробляється у вашому браузері. Файли ніколи не завантажуються на сервер.",
    replacePdf: "Додати ще PDF",
    pagesWord: "стор.",
    analyzing: "Аналіз…",
    analysisFailed: "Не вдалося прочитати цей PDF.",
    detected: "Визначено",
    reviewSuggested: "Рекомендовано перевірку",
    ready: "Готово",
    reviewPages: "Перевірити сторінки",
    noFilesYet:
      "Завантажте PDF, щоб побачити попередній перегляд сторінок і налаштувати області етикетки.",
    batchLimits: "Не більше 10 файлів і 200 сторінок за пакет.",
    editorTitle: "Налаштування області етикетки та накладної",
    editorHint:
      "Перетягуйте всередині рамки, щоб перемістити. Тягніть кут, щоб змінити розмір. Міняйте тип області кнопками нижче.",
    page: "Сторінка",
    regionType: "Тип області",
    kindLabel: "Етикетка",
    kindInvoice: "Накладна",
    kindFull: "Уся сторінка",
    fullPage: "Вписати всю сторінку",
    removeRegion: "Видалити область",
    resetRegions: "Скинути",
    cancel: "Скасувати",
    applySelection: "Застосувати вибір",
    sizeHint:
      "Сторінка виведення зберігає точні пропорції — без розтягнення та обрізання.",
    generate: "Створити PDF",
    generating: "Створення…",
    noRegionForMode:
      "Відповідних областей не знайдено. Виберіть інший тип вмісту або налаштуйте області.",
    sizeRequired: "Спочатку виберіть допустимий розмір виведення.",
    noValidFiles: "Спочатку додайте принаймні один читабельний PDF.",
    corruptError:
      "Цей PDF пошкоджений або захищений паролем і не може бути оброблений.",
    cropTooSmall:
      "Вибрана область замала для сторінки виведення. Змініть виділення.",
    resultTitle: "Ваші PDF",
    downloadAll: "Скачати все (ZIP)",
    printHint:
      "Друкуйте з масштабом 100 % (вибирайте «Фактичний розмір», а ніколи «Підогнати під сторінку») для точних розмірів етикетки.",
    noResults: "Тут з’являться створені вами PDF.",
    tooManyPages:
      "Досягнуто ліміт сторінок (200 сторінок за пакет). Видаліть частину файлів.",
  },
  vi: {
    platformLabel: "Nền tảng vận chuyển",
    platformAuto: "Tự động nhận diện",
    platformOther: "Khác / Tùy chỉnh",
    platformHint:
      "Chọn sàn thương mại của bạn để vùng được nhận diện với tỷ lệ chính xác. Tự động nhận diện đọc văn bản trong PDF của bạn.",
    outputSizeLabel: "Kích thước trang đầu ra",
    size4x6: "4 × 6 in (cuộn nhãn)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 in",
    size4x4: "4 × 4 in",
    sizeA4: "A4",
    sizeCustom: "Kích thước tùy chỉnh",
    widthLabel: "Chiều rộng",
    heightLabel: "Chiều cao",
    unitMm: "mm",
    unitIn: "in",
    unitLabel: "Đơn vị",
    customSizeError: "Nhập chiều rộng và chiều cao hợp lệ (10–1000 mm).",
    contentLabel: "Nội dung",
    modeLabelOnly: "Nhãn vận chuyển",
    modeInvoiceOnly: "Hóa đơn",
    modeBoth: "Nhãn + Hóa đơn",
    modeHint:
      "Mỗi vùng được chọn sẽ đặt trên trang riêng có kích thước chính xác và được co giãn để vừa — không bao giờ kéo giãn, không bao giờ cắt xén.",
    printTip:
      "Mẹo: in ở tỷ lệ 100% (không chọn “vừa trang”) để đầu ra giữ đúng kích thước thực.",
    uploadTitle: "Thả tệp PDF vào đây",
    uploadHint: "hoặc nhấp để duyệt — tối đa 10 tệp, mỗi tệp 50 MB",
    uploadPrivacy:
      "Mọi xử lý diễn ra trong trình duyệt của bạn. Tệp của bạn không bao giờ được tải lên máy chủ.",
    replacePdf: "Thêm PDF khác",
    pagesWord: "trang",
    analyzing: "Đang phân tích…",
    analysisFailed: "Không thể đọc PDF này.",
    detected: "Đã nhận diện",
    reviewSuggested: "Cần xem lại",
    ready: "Sẵn sàng",
    reviewPages: "Xem lại trang",
    noFilesYet: "Tải PDF lên để xem trước trang và điều chỉnh vùng nhãn.",
    batchLimits: "Tối đa 10 tệp và 200 trang mỗi lô.",
    editorTitle: "Điều chỉnh vùng nhãn & hóa đơn",
    editorHint:
      "Kéo bên trong khung để di chuyển. Kéo góc để thay đổi kích thước. Đổi loại vùng bằng các nút bên dưới.",
    page: "Trang",
    regionType: "Loại vùng",
    kindLabel: "Nhãn",
    kindInvoice: "Hóa đơn",
    kindFull: "Toàn trang",
    fullPage: "Vừa toàn trang",
    removeRegion: "Xóa vùng",
    resetRegions: "Đặt lại",
    cancel: "Hủy",
    applySelection: "Áp dụng lựa chọn",
    sizeHint: "Trang đầu ra giữ đúng tỷ lệ này — không kéo giãn, không cắt xén.",
    generate: "Tạo PDF",
    generating: "Đang tạo…",
    noRegionForMode:
      "Không tìm thấy vùng phù hợp trên trang nào. Chọn loại nội dung khác hoặc điều chỉnh vùng.",
    sizeRequired: "Hãy chọn kích thước đầu ra hợp lệ trước.",
    noValidFiles: "Hãy thêm ít nhất một PDF đọc được trước.",
    corruptError:
      "PDF này bị hỏng hoặc được bảo vệ bằng mật khẩu nên không thể xử lý.",
    cropTooSmall:
      "Vùng đã chọn quá nhỏ so với trang đầu ra. Vui lòng điều chỉnh lựa chọn.",
    resultTitle: "PDF của bạn",
    downloadAll: "Tải tất cả (ZIP)",
    printHint:
      "In ở tỷ lệ 100% (chọn “kích thước thực”, tuyệt đối không chọn “vừa trang”) để có kích thước nhãn chính xác.",
    noResults: "PDF bạn tạo sẽ xuất hiện ở đây.",
    tooManyPages:
      "Đã đạt giới hạn trang (200 trang mỗi lô). Hãy xóa bớt tệp.",
  },
  sw: {
    platformLabel: "Jukwaa la usafirishaji",
    platformAuto: "Utambuzi wa kiotomatiki",
    platformOther: "Nyingine / Maalum",
    platformHint:
      "Chagua soko lako ili maeneo yatambuliwe kwa uwiano sahihi. Utambuzi wa kiotomatiki usoma maandishi ndani ya PDF yako.",
    outputSizeLabel: "Ukubwa wa ukurasa wa matokeo",
    size4x6: "4 × 6 inchi (raba ya lebo)",
    size100x150: "100 × 150 mm",
    size3x5: "3 × 5 inchi",
    size4x4: "4 × 4 inchi",
    sizeA4: "A4",
    sizeCustom: "Ukubwa maalum",
    widthLabel: "Upana",
    heightLabel: "Urefu",
    unitMm: "mm",
    unitIn: "inchi",
    unitLabel: "Kipimo",
    customSizeError: "Weka upana na urefu sahihi (10–1000 mm).",
    contentLabel: "Maudhui",
    modeLabelOnly: "Lebo ya usafirishaji",
    modeInvoiceOnly: "Ankara",
    modeBoth: "Lebo + Ankara",
    modeHint:
      "Kila eneo lililochaguliwa hupangwa kwenye ukurasa wake mwenye ukubwa kamili na kubadilishwa ukubwa ili kuingia — hakunyoosha wala kukata.",
    printTip:
      "Kidokezo: chapisha kwa kiwango cha 100% (bila “kufanana na ukurasa”) ili matokeo yadumishe ukubwa halisi wa kimwili.",
    uploadTitle: "Weka faili za PDF hapa",
    uploadHint: "au bonyeza ili kutafuta — hadi faili 10, kila moja 50 MB",
    uploadPrivacy:
      "Kila kitu huchakatwa kwenye kivinjari chako. Faili zako hazipakwi kwenye seva kamwe.",
    replacePdf: "Ongeza PDF zaidi",
    pagesWord: "kurasa",
    analyzing: "Inachambua…",
    analysisFailed: "Hikuweza kusoma PDF hii.",
    detected: "Imetambulika",
    reviewSuggested: "Inashauriwa kukagua",
    ready: "Tayari",
    reviewPages: "Kagua kurasa",
    noFilesYet:
      "Pakia PDF ili kuona mapitio ya kurasa na kurekebisha maeneo ya lebo.",
    batchLimits: "Hadi faili 10 na kurasa 200 kwa kila kundi.",
    editorTitle: "Rekebisha eneo la lebo na ankara",
    editorHint:
      "Vuta ndani ya sanduku ili kusogeza. Pembe ili kubadilisha ukubwa. Badilisha aina ya eneo kwa vitufe hapa chini.",
    page: "Ukurasa",
    regionType: "Aina ya eneo",
    kindLabel: "Lebo",
    kindInvoice: "Ankara",
    kindFull: "Ukurasa mzima",
    fullPage: "Sawazisha ukurasa mzima",
    removeRegion: "Ondoa eneo",
    resetRegions: "Weka upya",
    cancel: "Ghairi",
    applySelection: "Tekeleza uchaguzi",
    sizeHint:
      "Ukurasa wa matokeo unadumisha uwiano huu sahihi — hakuna kunyoosha wala kukata.",
    generate: "Tengeneza PDF",
    generating: "Inatengeneza…",
    noRegionForMode:
      "Hakuna eneo linalolingana lililopatikana kwenye kurasa yoyote. Chagua aina nyingine ya maudhui au rekebisha maeneo.",
    sizeRequired: "Chagua kwanza ukubwa sahihi wa matokeo.",
    noValidFiles: "Ongeza angalau PDF moja inayosomeka kwanza.",
    corruptError:
      "PDF hii imeharibiwa au imehifadhiwa kwa nenosiri na haiwezi kuchakatwa.",
    cropTooSmall:
      "Eneo lililochaguliwa ni ndogo sana kwa ukurasa wa matokeo. Tafadhali rekebisha uchaguzi.",
    resultTitle: "PDF zako",
    downloadAll: "Pakua zote (ZIP)",
    printHint:
      "Chapisha kwa kiwango cha 100% (chagua “ukubwa halisi”, kamwe si “kufanana na ukurasa”) ili vipimo vya lebo viwe sahihi.",
    noResults: "PDF ulizotengeneza zitaonekana hapa.",
    tooManyPages:
      "Kikomo cha kurasa kimefikiwa (kurasa 200 kwa kila kundi). Ondoa baadhi ya faili.",
  },
};

export function getShippingLabelStrings(
  locale: Locale
): ShippingLabelStrings {
  return { ...shippingLabelEn, ...(shippingLabelByLocale[locale] ?? {}) };
}

export function getToolText(locale: Locale, slug: string): ToolText {
  const localized = toolTextByLocale[locale] ?? toolTextEn;
  return localized[slug] ?? toolTextEn[slug] ?? { title: slug, description: "" };
}