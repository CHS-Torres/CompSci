
// Year stamp
document.getElementById('year').textContent = new Date().getFullYear();

// i18n dictionary (English default)
const dict = {
  en: {
    title: "Mr. Torres’ Computer & CTE Parent Hub",
    "nav.welcome":"Welcome",
    "nav.updates":"Weekly Updates",
    "nav.pathways":"Course Pathways",
    "nav.contact":"Contact",
    "nav.learn":"What We Learn",
    "nav.library":"Docs Library",
    "nav.showcase":"Student Showcase",
    "nav.support":"Family Support",
    "nav.citizenship":"Digital Citizenship",
    "nav.help":"How Students Get Help",
    "nav.why":"Why These Courses Matter",

    "welcome.title":"📌 Welcome! / Bienvenidos",
    "welcome.body":"Hello families! This one page hub gives you the most important information to help your student succeed in Mr. Torres’ Computer & CTE classes. Available in English & Español. Estoy disponible para ayudarle cuando necesite.",

    "updates.title":"📅 Weekly Updates & Important Dates",
    "updates.whatsComing":"Weekly “What’s Coming”",
    "updates.posted":"Posted every week on:",
    "updates.canvas":"Canvas",
    "updates.site":"Class site: https://chs-torres.github.io/CompSci/",
    "updates.deadlines":"Major Deadlines & Events",
    "updates.calendar":"A full visibility calendar is available online (projects, tests, AP checkpoints, Game Design milestones).",
    "updates.viewCalendar":"View Full Calendar",

    "pathways.title":"🧭 Course Pathways",
    "pathways.body":"All classes taught by Mr. Torres are CTE electives, and:",
    "pathways.apCount":"AP CSP & AP CSA count toward graduation pathway completion",
    "pathways.contact":"If you have questions about how these courses support career pathways, contact me anytime.",

    "contact.title":"📞 How to Reach Mr. Torres",
    "contact.bestTimes":"Best contact times:",
    "contact.after":"After 3:30 PM",
    "contact.languages":"Languages:",
    "contact.langs":"English & Spanish / Inglés y Español",

    "learn.title":"🧩 What We Learn (Family-Friendly Unit Guides)",
    "learn.web.title":"🌐 Web Development (HTML/CSS/JS)",
    "learn.web.point1":"Structure & accessibility using semantic HTML",
    "learn.web.point2":"Responsive design with CSS",
    "learn.web.point3":"Interactive pages with events",
    "learn.web.helpTitle":"How families can help:",
    "learn.web.help1":"Ask: “How does your page adapt to different screens?”",
    "learn.web.help2":"Review HTML tags together",
    "learn.web.help3":"Encourage reading MDN docs",

    "learn.py.title":"🐍 Python Programming",
    "learn.py.point1":"Data types & lists",
    "learn.py.point2":"Loops & conditional logic",
    "learn.py.point3":"Functions & problem decomposition",
    "learn.py.helpTitle":"How families can help:",
    "learn.py.help1":"Ask them to explain a function",
    "learn.py.help2":"Encourage checking error messages",
    "learn.py.help3":"Help them test one idea at a time",

    "learn.java.title":"☕ Java (AP CSA)",
    "learn.java.point1":"Classes, methods & objects",
    "learn.java.point2":"Algorithms and debugging",
    "learn.java.point3":"Preparing for AP certification readiness",
    "learn.java.helpTitle":"How families can help:",
    "learn.java.help1":"Ask what a class does in their project",
    "learn.java.help2":"Discuss debugging steps",

    "learn.unity.title":"🎮 C# & Unity Game Development",
    "learn.unity.point1":"C# scripting basics",
    "learn.unity.point2":"Unity components & scenes",
    "learn.unity.point3":"Game loops, iteration & playtesting",
    "learn.unity.helpTitle":"How families can help:",
    "learn.unity.help1":"Playtest with your student",
    "learn.unity.help2":"Ask about choices they made in their game",
    "learn.unity.help3":"Encourage reviewing Unity docs",

    "library.title":"🧭 Documentation Library",
    "library.body":"Students are taught how to read technical documentation effectively—this is a core part of our classroom culture.",
    "library.reco":"Recommended links (English & some Spanish options):",

    "showcase.title":"🥇 Student Showcase",
    "showcase.body":"We highlight student creativity and growth through featured projects:",
    "showcase.web":"Web Pages",
    "showcase.py":"Python Games",
    "showcase.java":"Java Programs",
    "showcase.unity":"Unity Games",
    "showcase.privacy":"Students choose what gets posted publicly. Everything else stays in Canvas.",

    "support.title":"❤️ How Families Can Support Student Success",
    "support.routineTitle":"🕒 Weekly Routine (Easy to Remember!)",
    "support.routineIntro":"Your teaching style is highly structured and consistent. This is how the week typically works (based on your history):",
    "support.day":"Day",
    "support.what":"What Happens",
    "support.mon":"Monday",
    "support.monDetail":"New weekly slide deck, bell ringer, overview",
    "support.tueThu":"Tue–Thu",
    "support.tueThuDetail":"Skill practice, projects, documentation",
    "support.thu":"Thursday",
    "support.thuDetail":"All work due in one consolidated Canvas assignment",
    "support.fri":"Friday",
    "support.friDetail":"Reflection day, catch-up, AP practice",
    "support.parentsLove":"(Parents love this consistency!)",
    "support.strengthsTitle":"📚 Strengths-Based Communication",
    "support.str1":"Updates focus on strengths first",
    "support.str2":"Micro goals are set with 2–3 week check-ins",
    "support.str3":"Tips for home support are provided",

    "citizenship.title":"🌍 Digital Citizenship & Professional Skills",
    "citizenship.p1":"Time management",
    "citizenship.p2":"Email etiquette",
    "citizenship.p3":"Collaboration",
    "citizenship.p4":"Responsible tech use",

    "help.title":"🧠 How Students Get Help",
    "help.h1":"Flexible meeting options (phone, Zoom/Teams)",
    "help.h2":"Translation available",
    "help.h3":"Checkpoints every 3–4 weeks",
    "help.h4":"Access to AP Classroom, Unity Learn, and tutorials",

    "why.title":"🎯 Why These Courses Matter",
    "why.p1":"Real-world technical skills",
    "why.p2":"A digital portfolio",
    "why.p3":"Problem-solving & creativity",
    "why.p4":"Career and college readiness",

    "footer.updated":"Updated regularly"
  },
  es: {
    title: "Centro para Familias de Computación y CTE del Sr. Torres",
    "nav.welcome":"Bienvenida",
    "nav.updates":"Actualizaciones Semanales",
    "nav.pathways":"Trayectorias",
    "nav.contact":"Contacto",
    "nav.learn":"Lo que Aprendemos",
    "nav.library":"Biblioteca de Documentación",
    "nav.showcase":"Proyectos de Estudiantes",
    "nav.support":"Apoyo para Familias",
    "nav.citizenship":"Ciudadanía Digital",
    "nav.help":"Cómo Obtener Ayuda",
    "nav.why":"Por Qué Importa",

    "welcome.title":"📌 ¡Bienvenidos!",
    "welcome.body":"¡Hola familias! Esta página reúne la información más importante para ayudar a su estudiante a tener éxito en las clases de Computación y CTE del Sr. Torres. Disponible en inglés y español. Estoy disponible para ayudarle cuando lo necesite.",

    "updates.title":"📅 Actualizaciones y Fechas Importantes",
    "updates.whatsComing":"“Lo que viene” cada semana",
    "updates.posted":"Publicado cada semana en:",
    "updates.canvas":"Canvas",
    "updates.site":"Sitio de la clase: https://chs-torres.github.io/CompSci/",
    "updates.deadlines":"Fechas límite y eventos",
    "updates.calendar":"Hay un calendario público con proyectos, exámenes, puntos de control de AP y metas de Game Design.",
    "updates.viewCalendar":"Ver calendario completo",

    "pathways.title":"🧭 Trayectorias de los Cursos",
    "pathways.body":"Todas las clases del Sr. Torres son optativas de CTE y:",
    "pathways.apCount":"AP CSP y AP CSA cuentan para completar una trayectoria de graduación",
    "pathways.contact":"Si tiene preguntas sobre cómo estos cursos apoyan trayectorias profesionales, contácteme cuando guste.",

    "contact.title":"📞 Cómo Contactar al Sr. Torres",
    "contact.bestTimes":"Mejores horarios para contactar:",
    "contact.after":"Después de las 3:30 PM",
    "contact.languages":"Idiomas:",
    "contact.langs":"Inglés y Español",

    "learn.title":"🧩 Lo que Aprendemos (Guías para Familias)",
    "learn.web.title":"🌐 Desarrollo Web (HTML/CSS/JS)",
    "learn.web.point1":"Estructura y accesibilidad con HTML semántico",
    "learn.web.point2":"Diseño responsivo con CSS",
    "learn.web.point3":"Interactividad con eventos",
    "learn.web.helpTitle":"Cómo pueden ayudar en casa:",
    "learn.web.help1":"Pregunte: “¿Cómo se adapta tu página a diferentes pantallas?”",
    "learn.web.help2":"Repasen juntos etiquetas de HTML",
    "learn.web.help3":"Motívenles a leer la documentación de MDN",

    "learn.py.title":"🐍 Programación con Python",
    "learn.py.point1":"Tipos de datos y listas",
    "learn.py.point2":"Bucles y lógica condicional",
    "learn.py.point3":"Funciones y descomposición de problemas",
    "learn.py.helpTitle":"Cómo pueden ayudar en casa:",
    "learn.py.help1":"Pídales que expliquen una función",
    "learn.py.help2":"Motívenles a revisar los mensajes de error",
    "learn.py.help3":"Ayúdenles a probar una idea a la vez",

    "learn.java.title":"☕ Java (AP CSA)",
    "learn.java.point1":"Clases, métodos y objetos",
    "learn.java.point2":"Algoritmos y depuración",
    "learn.java.point3":"Preparación para la certificación de AP",
    "learn.java.helpTitle":"Cómo pueden ayudar en casa:",
    "learn.java.help1":"Pregunte qué hace una clase en su proyecto",
    "learn.java.help2":"Conversen sobre los pasos de depuración",

    "learn.unity.title":"🎮 C# y Unity (Desarrollo de Juegos)",
    "learn.unity.point1":"Conceptos básicos de C#",
    "learn.unity.point2":"Componentes y escenas en Unity",
    "learn.unity.point3":"Bucle de juego, iteración y pruebas de juego",
    "learn.unity.helpTitle":"Cómo pueden ayudar en casa:",
    "learn.unity.help1":"Jueguen y prueben con su estudiante",
    "learn.unity.help2":"Pregunten por las decisiones tomadas en su juego",
    "learn.unity.help3":"Motívenles a revisar la documentación de Unity",

    "library.title":"🧭 Biblioteca de Documentación",
    "library.body":"Enseñamos a leer documentación técnica de forma efectiva: es parte esencial de la cultura del aula.",
    "library.reco":"Enlaces recomendados (inglés y algunas opciones en español):",

    "showcase.title":"🥇 Muestra de Estudiantes",
    "showcase.body":"Destacamos creatividad y crecimiento con proyectos como:",
    "showcase.web":"Páginas Web",
    "showcase.py":"Juegos en Python",
    "showcase.java":"Programas en Java",
    "showcase.unity":"Juegos en Unity",
    "showcase.privacy":"El estudiantado decide qué se publica públicamente. Lo demás permanece en Canvas.",

    "support.title":"❤️ Cómo las Familias Pueden Apoyar",
    "support.routineTitle":"🕒 Rutina Semanal (¡Fácil de Recordar!)",
    "support.routineIntro":"Su estilo de enseñanza es estructurado y consistente. Así funciona la semana típicamente:",
    "support.day":"Día",
    "support.what":"Qué sucede",
    "support.mon":"Lunes",
    "support.monDetail":"Nueva presentación semanal, bell ringer y panorama general",
    "support.tueThu":"Mar–Jue",
    "support.tueThuDetail":"Práctica de habilidades, proyectos, documentación",
    "support.thu":"Jueves",
    "support.thuDetail":"Todo se entrega en una sola tarea consolidada en Canvas",
    "support.fri":"Viernes",
    "support.friDetail":"Reflexión, ponerse al día y práctica AP",
    "support.parentsLove":"(¡A las familias les encanta esta consistencia!)",
    "support.strengthsTitle":"📚 Comunicación Basada en Fortalezas",
    "support.str1":"Los avisos enfatizan fortalezas primero",
    "support.str2":"Se establecen micro-metas con revisión cada 2–3 semanas",
    "support.str3":"Se dan consejos para apoyar desde casa",

    "citizenship.title":"🌍 Ciudadanía Digital y Habilidades Profesionales",
    "citizenship.p1":"Gestión del tiempo",
    "citizenship.p2":"Etiqueta en el correo",
    "citizenship.p3":"Colaboración",
    "citizenship.p4":"Uso responsable de la tecnología",

    "help.title":"🧠 Cómo el Estudiantado Obtiene Ayuda",
    "help.h1":"Opciones flexibles (teléfono, Zoom/Teams)",
    "help.h2":"Traducción disponible",
    "help.h3":"Puntos de control cada 3–4 semanas",
    "help.h4":"Acceso a AP Classroom, Unity Learn y tutoriales",

    "why.title":"🎯 Por Qué Importan Estos Cursos",
    "why.p1":"Habilidades técnicas del mundo real",
    "why.p2":"Un portafolio digital",
    "why.p3":"Resolución de problemas y creatividad",
    "why.p4":"Preparación para la universidad y carreras",

    "footer.updated":"Se actualiza regularmente"
  }
};

// Language toggle with localStorage
const langBtn = document.getElementById('langToggle');
const nodes = document.querySelectorAll('[data-i18n]');

function applyLang(lang){
  const pack = dict[lang] || dict.en;
  nodes.forEach(node=>{
    const key = node.getAttribute('data-i18n');
    if (pack[key]) node.textContent = pack[key];
  });
  document.title = pack.title;
  document.documentElement.lang = (lang === 'es' ? 'es' : 'en');
  langBtn.textContent = (lang === 'es' ? 'English' : 'Español');
  localStorage.setItem('hub-lang', lang);
}

let current = localStorage.getItem('hub-lang') || 'en';
applyLang(current);

langBtn.addEventListener('click', ()=>{
  current = (current === 'en') ? 'es' : 'en';
  applyLang(current);
});
