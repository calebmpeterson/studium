import { HistoricalEvent, HistoricalMilestone } from "@/types/historical";

export const CURRENT_YEAR = new Date().getFullYear();

export const BOOKS: HistoricalEvent[] = [
  { title: "Genesis", date_started: -1446, date_completed: -1406 },
  { title: "Exodus", date_started: -1446, date_completed: -1406 },
  { title: "Leviticus", date_started: -1446, date_completed: -1406 },
  { title: "Numbers", date_started: -1446, date_completed: -1406 },
  { title: "Deuteronomy", date_started: -1406, date_completed: -1406 },
  { title: "Joshua", date_started: -1375, date_completed: -1240 },
  { title: "Judges", date_started: -1045, date_completed: -1000 },
  { title: "Ruth", date_started: -1000, date_completed: -950 },
  { title: "1 Samuel", date_started: -931, date_completed: -722 },
  { title: "2 Samuel", date_started: -931, date_completed: -722 },

  { title: "1 Kings", date_started: -971, date_completed: -852 },
  { title: "2 Kings", date_started: -852, date_completed: -562 },
  { title: "1 Chronicles", date_started: -450, date_completed: -430 },
  { title: "2 Chronicles", date_started: -430, date_completed: -400 },
  { title: "Ezra", date_started: -458, date_completed: -444 },
  { title: "Nehemiah", date_started: -445, date_completed: -432 },
  { title: "Esther", date_started: -483, date_completed: -473 },
  { title: "Job", date_started: -2000, date_completed: -1800 },
  { title: "Psalms", date_started: -1000, date_completed: -400 },
  { title: "Proverbs", date_started: -900, date_completed: -700 },

  { title: "Ecclesiastes", date_started: -450, date_completed: -180 },
  { title: "Song of Solomon", date_started: -970, date_completed: -931 },
  { title: "Isaiah", date_started: -740, date_completed: -680 },
  { title: "Jeremiah", date_started: -627, date_completed: -582 },
  { title: "Lamentations", date_started: -587, date_completed: -587 },
  { title: "Ezekiel", date_started: -593, date_completed: -573 },
  { title: "Daniel", date_started: -605, date_completed: -536 },
  { title: "Hosea", date_started: -785, date_completed: -725 },
  { title: "Joel", date_started: -835, date_completed: -796 },
  { title: "Amos", date_started: -760, date_completed: -750 },

  { title: "Obadiah", date_started: -586, date_completed: -586 },
  { title: "Jonah", date_started: -780, date_completed: -760 },
  { title: "Micah", date_started: -735, date_completed: -700 },
  { title: "Nahum", date_started: -663, date_completed: -612 },
  { title: "Habakkuk", date_started: -609, date_completed: -588 },
  { title: "Zephaniah", date_started: -630, date_completed: -625 },
  { title: "Haggai", date_started: -520, date_completed: -520 },
  { title: "Zechariah", date_started: -520, date_completed: -480 },
  { title: "Malachi", date_started: -450, date_completed: -430 },
  { title: "Matthew", date_started: 4, date_completed: 70 },

  { title: "Mark", date_started: 50, date_completed: 70 },
  { title: "Luke", date_started: 60, date_completed: 100 },
  { title: "John", date_started: 70, date_completed: 100 },
  { title: "Acts", date_started: 61, date_completed: 63 },
  { title: "Romans", date_started: 56, date_completed: 57 },
  { title: "1 Corinthians", date_started: 55, date_completed: 55 },
  { title: "2 Corinthians", date_started: 55, date_completed: 55 },
  { title: "Galatians", date_started: 49, date_completed: 49 },
  { title: "Ephesians", date_started: 60, date_completed: 62 },
  { title: "Philippians", date_started: 60, date_completed: 62 },

  { title: "Colossians", date_started: 60, date_completed: 62 },
  { title: "1 Thessalonians", date_started: 51, date_completed: 51 },
  { title: "2 Thessalonians", date_started: 51, date_completed: 51 },
  { title: "1 Timothy", date_started: 62, date_completed: 64 },
  { title: "2 Timothy", date_started: 64, date_completed: 66 },
  { title: "Titus", date_started: 62, date_completed: 64 },
  { title: "Philemon", date_started: 60, date_completed: 61 },
  { title: "Hebrews", date_started: 64, date_completed: 68 },
  { title: "James", date_started: 45, date_completed: 49 },
  { title: "1 Peter", date_started: 62, date_completed: 64 },

  { title: "2 Peter", date_started: 64, date_completed: 68 },
  { title: "1 John", date_started: 90, date_completed: 95 },
  { title: "2 John", date_started: 90, date_completed: 95 },
  { title: "3 John", date_started: 90, date_completed: 95 },
  { title: "Jude", date_started: 65, date_completed: 80 },
  { title: "Revelation", date_started: 90, date_completed: 95 },
];

export const MILESTONES: HistoricalMilestone[] = [
  { title: "Creation", date: -4000, color: "green", approximate: true },
  { title: "Noah's Flood", date: -2350, color: "blue", approximate: true },
  { title: "Tower of Babel", date: -2200, color: "amber", approximate: true },

  {
    title: "Christ's Birth",
    date: 0,
    color: "purple",
    labelPosition: "left",
    approximate: true,
  },
  {
    title: "Christ's Death, Burial, & Resurrection",
    date: 33,
    color: "purple",
  },

  { title: "Present Day", date: CURRENT_YEAR, color: "blue" },
];

export const EVENTS: HistoricalEvent[] = [
  {
    title: "Mosaic Theocracy",
    date_started: -1446,
    date_completed: -1050,
    color: "purple",
    details:
      "As recorded in the book of Judges, the nation of Israel is ruled by God through the judges.",
    link: "https://www.bible.com/bible/116/JDG.1.NLT",
  },
  {
    title: "Davidic Aristocracy",
    date_started: -1050,
    date_completed: -587,
    color: "purple",
    details:
      "As recorded in the books of Samuel, Kings, and Chronicles, Israel is ruled as a united kingdom under Saul, David, and David's son Solomon.\n\nThe kingdom is divided into the ten northern tribes of Israel, and the two southern tribes of Judah and Benjamin after Solomon's death by his sons Jeroboam and Rehoboam respectively.\n\nThe aristocratic period represents the extent of Jewish civil authority.",
    link: "https://www.bible.com/bible/116/1SA.1.NLT",
  },
  {
    title: "Solomon's Temple",
    date_started: -966,
    date_completed: -586,
    color: "purple",
    details:
      "Constructed by King Solomon. Destroyed by the Babylonians in the early part of the Exile.",
  },
  {
    title: "Babylonian Exile",
    date_started: -607,
    date_completed: -537,
    color: "info",
    details:
      "In fulfillment of Jeremiah 25:11, the Jewish people are taken captive to Babylon (modern Iraq) for 70 years.",
    link: "https://www.bible.com/bible/116/jer.25.11",
  },
  {
    title: "Babylonian Empire",
    date_started: -626,
    date_completed: -539,
    color: "gold",
    details:
      "As foretold over a century prior by the prophet Isaiah, Babylon is conquered by Cyrus, King of Persia in 539 BC.",
    link: "https://www.bible.com/bible/116/isa.48.14",
  },
  {
    title: "Persian Empire",
    date_started: -538,
    date_completed: -330,
    color: "silver",
  },
  {
    title: "Daniel's Captivity",
    date_started: -605,
    date_completed: -540,
    color: "info",
    approximate: true,
  },
  {
    title: "Jerusalem Besieged",
    date_started: -587,
    date_completed: -586,
    color: "red",
    details:
      "Jerusalem is besieged by the Babylonians under Nebuchadnezzar's command.",
  },
  {
    title: "Jerusalem Restored",
    date_started: -444,
    date_completed: -444,
    color: "info",
    approximate: true,
    details:
      "Artaxerxes I grants permission to Nehemiah to repair Jerusalem. The 69 sevens foretold in Daniel 9:25 begin.",
    link: "https://www.bible.com/bible/116/NEH.2.NLT",
  },
  {
    title: "69 Sevens",
    date_started: -444,
    date_completed: 33,
    color: "info",
    approximate: true,
    details:
      "According to Daniel 9:25, 7 sevens and 62 sevens (69 * 7 years = 483 years) are declared from the command to rebuild Jerusalem until the Anointed One - Messiah - is cut off. Keeping in mind that a Biblical year is 360 days, 483 Biblical years is approximately 476 Gregorian years.",
    link: "https://www.bible.com/bible/116/DAN.9.NLT",
  },
  {
    title: "Construction of the Second Temple",
    date_started: -536,
    date_completed: -516,
    color: "purple",
    details:
      "Began by the decree of Cyrus, King of Persia. Overseen by Zerubbabel. Reaffirmed by Darius I",
    link: "https://www.gotquestions.org/Zerubbabel-second-temple.html",
  },
  {
    title: "Second Temple",
    date_started: -516,
    date_completed: 70,
    color: "purple",
  },
  {
    title: "Alexander the Great",
    date_started: -356,
    date_completed: -323,
    color: "brass",
    details:
      "As foretold by the prophet Daniel over 200 years prior, Greece, under the rule of Alexander the Great, swiftly conquers the known world.\n\nAlexander dies suddenly at the height of his reign and his kingdom is divided amongst his four generals.",
    link: "https://www.gotquestions.org/seventy-weeks.html",
  },
  {
    title: "Cassander",
    date_started: -305,
    date_completed: -297,
    color: "brass",
  },
  {
    title: "Lysimachus",
    date_started: -306,
    date_completed: -281,
    color: "brass",
  },
  {
    title: "Ptolemy",
    date_started: -305,
    date_completed: -282,
    color: "brass",
  },
  {
    title: "Ptolemaic Dynasty",
    date_started: -305,
    date_completed: -30,
    color: "brass",
  },
  {
    title: "Seleucus",
    date_started: -305,
    date_completed: -281,
    color: "brass",
  },
  {
    title: "Seleucid Empire",
    date_started: -305,
    date_completed: -63,
    color: "brass",
  },
  {
    title: "Antiochus Epiphanes",
    date_started: -175,
    date_completed: -164,
    color: "red",
  },
  {
    title: "Maccabean Revolt",
    date_started: -167,
    date_completed: -164,
    color: "info",
  },
  {
    title: "Roman Empire",
    date_started: -146,
    date_completed: 313,
    color: "iron",
    details:
      "As foretold by Daniel 500 years earlier, the Roman Empire eclipses the vestiges of the Greecian empire.\n\nThe Roman Empire continues to exist under various governmental forms until the reign of Constantine.",
  },
  {
    title: "Holy Roman Empire",
    date_started: 313,
    date_completed: CURRENT_YEAR,
    color: "iron",
    details:
      "Constantine issues the Edict of Milan, thus declaring Christianity to be the official religion of the Roman Empire.\n\nAlthough no longer an official nation, Rome's influence continues as the seat of the Roman Catholic Church. The Pope is the monarch of the Vatican City; the empire continues to this day as a nominal theocracy.",
  },
  {
    title: "Roman Occupation of Jerusalem",
    date_started: -63,
    date_completed: 70,
    color: "iron",
  },
  {
    title: "Second Temple Destroyed",
    date_started: 70,
    date_completed: 70,
    color: "red",
    details:
      "As foretold by Christ in Matthew 24, the Second Temple is destroyed by the Romans along with much of Jerusalem. The Jewish people are scattered abroad until 1948.",
    link: "https://www.bible.com/bible/116/MAT.24.NLT",
  },

  {
    title: "Balfour Declaration",
    date_started: 1917,
    date_completed: 1917,
    color: "blue",
    details:
      "The Balfour Declaration initiated the process of re-establishing the nation of Israel",
    link: "https://en.wikipedia.org/wiki/Balfour_Declaration",
  },
  {
    title: "Modern Nation of Israel",
    date_started: 1948,
    date_completed: CURRENT_YEAR,
    color: "blue",
    details: "Israel is re-established as a nation after almost 2,000 years.",
    link: "https://en.wikipedia.org/wiki/Jewish_state",
  },

  // Church councils
  {
    title: "Council of Nicaea",
    date_started: 325,
    date_completed: 325,
    color: "info",
    details:
      "Addressed the Arian controversy and formulated the Nicene Creed, asserting the orthodox belief in the divinity of Jesus Christ.",
    link: "https://en.wikipedia.org/wiki/First_Council_of_Nicaea",
  },
  {
    title: "Council of Hippo",
    date_started: 393,
    date_completed: 393,
    color: "info",
    details: "Discussed and affirmed the canon of the Old and New Testaments.",
    link: "https://en.wikipedia.org/wiki/Council_of_Hippo",
  },
  {
    title: "Council of Carthage",
    date_started: 397,
    date_completed: 397,
    color: "info",
    details:
      "Ratified the canon of both the Old and New Testaments, confirming the same canon as the Council of Hippo.",
    link: "https://en.wikipedia.org/wiki/Council_of_Carthage_(397)",
  },
  {
    title: "Council of Ephesus",
    date_started: 431,
    date_completed: 431,
    color: "info",
    details:
      "Addressed theological matters, affirmed the title of Mary as Theotokos, indirectly influencing the acceptance of certain New Testament books.",
    link: "https://en.wikipedia.org/wiki/Council_of_Ephesus",
  },
  {
    title: "Council of Chalcedon",
    date_started: 451,
    date_completed: 451,
    color: "info",
    details:
      "Dealt primarily with Christological controversies, affirming the belief in the two natures of Christ, indirectly influencing the acceptance of certain texts related to Christology.",
    link: "https://en.wikipedia.org/wiki/Council_of_Chalcedon",
  },
];
