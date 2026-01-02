export const fourthSnapshot = {
  date: new Date().toISOString(),
  description: "Present",
  hash: "current",

  hero: {
    name: "Sebastian Wu",
    subtitle: "Grade 11 IB Student @ MHS, Ottawa",
    status: "Available for opportunities"
  },

  aboutSections: [
    {
      title: "Who I Am",
      content: "I'm a Grade 11 IB (International Baccalaureate 🤕) student at Merivale High School in Ottawa with a passion for technology and problem-solving. You'll usually find me cubing, writing, doing homework, watching youtube, or coding!"
    },
    {
      title: "Interests",
      content: "Speedcubing, Problem Solving, Math, Studio Ghibli, Photography and Creative Writing"
    },
    {
      title: "Currently",
      content: "Building web applications with React (this website!), learning rubik's cube algorithms (COLL), exploring new things, (probably) listening to music."
    }
  ],

  skills: [
    { name: "Python", level: "Proficient" },
    { name: "HTML", level: "Proficient" },
    { name: "CSS", level: "Proficient" },
    { name: "JavaScript", level: "Proficient" },
    { name: "React", level: "Intermediate" }
  ],

  features: {
    photography: true,
    cubing: true,
    guestbook: true,
    blog: true,
    navigation: true,
    konami: true,
    timeTravel: true,
    music: true,
    weather: true,
    clock: true,
    resume: true
  },

  styling: {
    hasBackgroundImage: true,
    cardOpacity: 0.8,
    borderRadius: "24px"
  }
};