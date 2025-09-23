import { type Movie } from '@/context/MovieContext';

export const mockMovies: Movie[] = [
  {
    id: 550,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
    overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    release_date: "1999-10-15",
    vote_average: 8.4,
    genre_ids: [18, 53],
    genres: [
      { id: 18, name: "Drama" },
      { id: 53, name: "Thriller" }
    ],
    production_countries: [
      { iso_3166_1: "US", name: "United States" }
    ],
    cinema_release_periods: [
      { region: "United States", start_date: "October 1999", end_date: "March 2000" },
      { region: "International", start_date: "November 1999", end_date: "May 2000" },
      { region: "Home Video", start_date: "June 2000", end_date: "Present" }
    ]
  },
  {
    id: 13,
    title: "Forrest Gump",
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "/7c8H1nlln7dSeZi3amimaWoLTCK.jpg",
    overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
    release_date: "1994-07-06",
    vote_average: 8.5,
    genre_ids: [35, 18, 10749],
    genres: [
      { id: 35, name: "Comedy" },
      { id: 18, name: "Drama" },
      { id: 10749, name: "Romance" }
    ]
  },
  {
    id: 155,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    release_date: "2008-07-18",
    vote_average: 9.0,
    genre_ids: [28, 80, 18, 53],
    genres: [
      { id: 28, name: "Action" },
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
      { id: 53, name: "Thriller" }
    ],
    production_countries: [
      { iso_3166_1: "US", name: "United States" },
      { iso_3166_1: "GB", name: "United Kingdom" }
    ],
    cinema_release_periods: [
      { region: "United States", start_date: "July 2008", end_date: "December 2008" },
      { region: "International", start_date: "July 2008", end_date: "January 2009" },
      { region: "IMAX Re-release", start_date: "January 2009", end_date: "February 2009" }
    ]
  },
  {
    id: 238,
    title: "The Godfather",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
    release_date: "1972-03-24",
    vote_average: 9.2,
    genre_ids: [80, 18],
    genres: [
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" }
    ],
    production_countries: [
      { iso_3166_1: "US", name: "United States" }
    ],
    cinema_release_periods: [
      { region: "United States", start_date: "March 1972", end_date: "December 1972" },
      { region: "International", start_date: "April 1972", end_date: "June 1973" },
      { region: "Revival Theaters", start_date: "January 1982", end_date: "December 1982" }
    ]
  },
  {
    id: 424,
    title: "Schindler's List",
    poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    backdrop_path: "/yFuKvT4Vm3sKHdFY4eWXAo6qanC.jpg",
    overview: "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",
    release_date: "1993-12-15",
    vote_average: 9.0,
    genre_ids: [18, 36, 10752],
    genres: [
      { id: 18, name: "Drama" },
      { id: 36, name: "History" },
      { id: 10752, name: "War" }
    ]
  },
  {
    id: 278,
    title: "The Shawshank Redemption",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
    overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    release_date: "1994-09-23",
    vote_average: 9.3,
    genre_ids: [18, 80],
    genres: [
      { id: 18, name: "Drama" },
      { id: 80, name: "Crime" }
    ],
    production_countries: [
      { iso_3166_1: "US", name: "United States" }
    ],
    cinema_release_periods: [
      { region: "United States", start_date: "September 1994", end_date: "February 1995" },
      { region: "International", start_date: "October 1994", end_date: "June 1995" },
      { region: "Limited Re-release", start_date: "September 2004", end_date: "October 2004" }
    ]
  },
  {
    id: 680,
    title: "Pulp Fiction",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
    overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
    release_date: "1994-10-14",
    vote_average: 8.9,
    genre_ids: [53, 80],
    genres: [
      { id: 53, name: "Thriller" },
      { id: 80, name: "Crime" }
    ]
  },
  {
    id: 19404,
    title: "Dilwale Dulhania Le Jayenge",
    poster_path: "/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
    backdrop_path: "/nl79FQ8xWZkhL3rDr1v2RFFR6J0.jpg",
    overview: "Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.",
    release_date: "1995-10-20",
    vote_average: 8.7,
    genre_ids: [35, 18, 10749],
    genres: [
      { id: 35, name: "Comedy" },
      { id: 18, name: "Drama" },
      { id: 10749, name: "Romance" }
    ]
  },
  {
    id: 11216,
    title: "Cinema Paradiso",
    poster_path: "/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg",
    backdrop_path: "/loRmRzQXZeqG78TqZuyvSlEQfZb.jpg",
    overview: "A filmmaker recalls his childhood, when he fell in love with the movies at his village's theater and formed a deep friendship with the theater's projectionist.",
    release_date: "1988-11-17",
    vote_average: 8.4,
    genre_ids: [18, 10749],
    genres: [
      { id: 18, name: "Drama" },
      { id: 10749, name: "Romance" }
    ]
  },
  {
    id: 372058,
    title: "Your Name.",
    poster_path: "/q719jXXEzOoYaps6babgKnONONX.jpg",
    backdrop_path: "/7dSeRigdXiMC2LkGkRPpAI4M6ve.jpg",
    overview: "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki's body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.",
    release_date: "2016-08-26",
    vote_average: 8.5,
    genre_ids: [16, 18, 14, 10749],
    genres: [
      { id: 16, name: "Animation" },
      { id: 18, name: "Drama" },
      { id: 14, name: "Fantasy" },
      { id: 10749, name: "Romance" }
    ]
  },
  {
    id: 429617,
    title: "Spider-Man: Into the Spider-Verse",
    poster_path: "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    backdrop_path: "/7d6EY00g1c39SGZOoCJ5Py9nNth.jpg",
    overview: "Struggling to find his place in the world while juggling school and family, Brooklyn teenager Miles Morales is unexpectedly bitten by a radioactive spider and develops mysterious powers that transform him into the one and only Spider-Man. When he meets Peter Parker, he soon realizes that there are many others who share his special, high-flying talents.",
    release_date: "2018-12-14",
    vote_average: 8.4,
    genre_ids: [28, 12, 16, 878, 35],
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
      { id: 878, name: "Science Fiction" },
      { id: 35, name: "Comedy" }
    ]
  },
  {
    id: 496243,
    title: "Parasite",
    poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop_path: "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    release_date: "2019-05-30",
    vote_average: 8.5,
    genre_ids: [35, 53, 18],
    genres: [
      { id: 35, name: "Comedy" },
      { id: 53, name: "Thriller" },
      { id: 18, name: "Drama" }
    ]
  },
  {
    id: 389,
    title: "12 Angry Men",
    poster_path: "/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
    backdrop_path: "/qqHQsStV6exghCM7zbObuYBiYxw.jpg",
    overview: "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and shut case soon becomes a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other.",
    release_date: "1957-04-10",
    vote_average: 8.9,
    genre_ids: [18],
    genres: [
      { id: 18, name: "Drama" }
    ]
  },
  {
    id: 324857,
    title: "Spider-Man: Into the Spider-Verse",
    poster_path: "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    backdrop_path: "/7d6EY00g1c39SGZOoCJ5Py9nNth.jpg",
    overview: "Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson 'Kingpin' Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension.",
    release_date: "2018-12-14",
    vote_average: 8.4,
    genre_ids: [28, 12, 16, 878, 35],
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
      { id: 878, name: "Science Fiction" },
      { id: 35, name: "Comedy" }
    ]
  },
  {
    id: 10681,
    title: "WALL-E",
    poster_path: "/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
    backdrop_path: "/9cJETuLMc6R0bTWRA5i7ctY9bxk.jpg",
    overview: "What if mankind had to leave Earth and somebody forgot to turn the last robot off? After hundreds of years doing what he was built for, WALL•E discovers a new purpose in life when he meets a sleek reconnaissance robot named EVE.",
    release_date: "2008-06-27",
    vote_average: 8.2,
    genre_ids: [16, 10751, 878],
    genres: [
      { id: 16, name: "Animation" },
      { id: 10751, name: "Family" },
      { id: 878, name: "Science Fiction" }
    ]
  },
  {
    id: 27205,
    title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: 'inception', the implantation of another person's idea into a target's subconscious.",
    release_date: "2010-07-16",
    vote_average: 8.8,
    genre_ids: [28, 878, 53],
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Science Fiction" },
      { id: 53, name: "Thriller" }
    ],
    production_countries: [
      { iso_3166_1: "US", name: "United States" },
      { iso_3166_1: "GB", name: "United Kingdom" }
    ],
    cinema_release_periods: [
      { region: "United States", start_date: "July 2010", end_date: "December 2010" },
      { region: "International", start_date: "July 2010", end_date: "February 2011" },
      { region: "IMAX Extended Run", start_date: "August 2010", end_date: "November 2010" }
    ]
  }
];