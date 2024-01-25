import { Prisma } from "@prisma/client";
import prisma from "./db";
import { generateSlug } from "./utils";
const USER_ID = "65af93d77e0a3ab242309afe";

const data: Prisma.PostCreateInput[] = [
  {
    title: "Welcome to My Blog!",
    body: "This is my first post on my new blog. I'm excited to share my thoughts and experiences with you all. Stay tuned for more content!",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [{ name: "welcome" }, { name: "blogging" }],
      },
    },
  },
  {
    title: "5 Tips for Staying Productive",
    body: "In today's busy world, it can be tough to stay on top of everything. Here are 5 tips that have helped me stay productive and get things done: 1. Set clear goals. 2. Break down tasks into smaller steps. 3. Prioritize your work. 4. Avoid distractions. 5. Take breaks and reward yourself.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [{ name: "productivity" }, { name: "tips" }],
      },
    },
  },
  {
    title: "Brewing Up Knowledge: Coffee with a Side of Learning",
    body: "Fuel your curiosity with a steaming cup of knowledge! Join us as we sip on coffee and explore fascinating topics, delving deep into history, science, art, and everything in between.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [{ name: "coffee" }, { name: "learning" }, { name: "curiosity" }],
      },
    },
  },
  {
    title: "From Seed to Supper: The Magic of Growing Your Own Food",
    body: "Get your hands dirty and witness the wonder of nature! Discover the joy and satisfaction of cultivating your own food, from planting tiny seeds to reaping the delicious rewards of your labor.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [
          { name: "gardening" },
          { name: "food" },
          { name: "sustainability" },
        ],
      },
    },
  },
  {
    title: "The Art of the Cozy: Creating a Haven of Comfort in Your Home",
    body: "Transform your space into a sanctuary of warmth and joy. Learn tips and tricks to create a cozy atmosphere, from lighting and textures to decluttering and personal touches.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [
          { name: "homedecor" },
          { name: "comfort" },
          { name: "relaxation" },
        ],
      },
    },
  },
  {
    title: "Exploring Ghibli's Hidden Gems",
    body: "Beyond Spirited Away and My Neighbor Totoro, Studio Ghibli offers a treasure trove of lesser-known gems. Let's delve into the enchanting worlds of Pom Poko, Porco Rosso, and Tales of Earthsea, and discover their unique stories and stunning visuals.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [
          { name: "ghibli" },
          { name: "hiddengems" },
          { name: "animation" },
        ],
      },
    },
  },
  {
    title: "From Manga to Masterpiece: The Art of Anime Adaptation",
    body: "We often hear about anime based on manga, but how does the adaptation process work? Explore the challenges and triumphs of translating comic panels into moving narratives, using examples like Fullmetal Alchemist and Attack on Titan.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [{ name: "manga" }, { name: "anime" }, { name: "adaptation" }],
      },
    },
  },
  {
    title: "Anime beyond Genres: Uncovering Unexpected Favorites",
    body: "Step outside the comfort zone of conventional genres! This post explores captivating anime that defy categorization, from the heartfelt comedy-drama Barakamon to the sci-fi mystery Mushishi.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [{ name: "anime" }, { name: "genre" }, { name: "exploration" }],
      },
    },
  },
  {
    title: "Soundtracks that Strike a Chord: The Power of Anime Music",
    body: "Dive into the world of anime soundtracks and their emotional impact. From epic orchestrations like One Piece to the melancholic piano melodies of Your Name, discover how music elevates anime storytelling and leaves a lasting impression.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [{ name: "anime" }, { name: "music" }, { name: "soundtracks" }],
      },
    },
  },
  {
    title: "Cosplay Creations: Bringing Anime Characters to Life",
    body: "Celebrate the creativity and dedication of cosplayers who bring their favorite anime characters to life. Explore intricate costumes, stunning makeup artistry, and the passion behind crafting these wearable works of art.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [{ name: "cosplay" }, { name: "anime" }, { name: "creativity" }],
      },
    },
  },
  {
    title: "The Gentle Giants: Unveiling the Secrets of Giraffes",
    body: "Towering over the African savanna, giraffes are captivating creatures shrouded in fascinating facts. Did you know they have seven vertebrae in their necks like humans, just much longer? Or that their hearts are the size of a large basketball and pump blood up their massive necks? Join us on a journey to discover the secrets of these gentle giants, from their intriguing social lives to their surprising adaptations.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [
          { name: "giraffes" },
          { name: "facts" },
          { name: "adaptations" },
        ],
      },
    },
  },
  {
    title: "Giraffes: Masters of the Savanna",
    body: "Don't let their gentle demeanor fool you, giraffes are the undisputed kings and queens of the savanna. Their keen eyesight and powerful kicks make them formidable predators, while their long necks allow them to reach leaves and fruits no other animal can. Learn about their unique diet, their social hierarchies, and the unexpected challenges they face in the wild.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [{ name: "giraffes" }, { name: "savanna" }, { name: "diet" }],
      },
    },
  },
  {
    title: "The Giraffe Whisperer: Deciphering Their Language",
    body: "Giraffes communicate not only through vocalizations but also through subtle body language. From neck stretches and head bobs to tail swishes and vocal grunts, each movement holds hidden meaning. Let's explore the fascinating language of giraffes and learn how researchers are deciphering their messages to understand their complex social interactions.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [{ name: "giraffes" }, { name: "communication" }],
      },
    },
  },
  {
    title: "Did You Know?: Fun Facts About Giraffes",
    body: "Get ready to be amazed by these surprising and delightful facts about giraffes! Did you know their spots are as unique as fingerprints? Or that they can lick their own ears? Dive into a collection of trivia that will leave you appreciating these gentle giants even more.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [{ name: "giraffes" }],
      },
    },
  },
  {
    title: "Giraffes in Art & Culture: A Timeless Symbol",
    body: "From ancient Egyptian hieroglyphs to contemporary murals, giraffes have captivated artists and storytellers throughout history. Explore their symbolic meaning in different cultures, from wisdom and longevity to elegance and connection. Discover how these graceful creatures continue to inspire artists and ignite our imaginations.",
    image: null,
    slug: Date.now().toString(),
    author: {
      connect: {
        id: USER_ID,
      },
    },
    tags: {
      createMany: {
        data: [{ name: "giraffes" }, { name: "art" }, { name: "symbolism" }],
      },
    },
  },
];

const seed = async () => {
  console.log("====================");
  console.log("Seeding started 🌱");
  console.log("====================");

  try {
    data.forEach(async (post) => {
      post.slug = generateSlug(post.title);
      const created = await prisma.post.create({
        data: post,
      });
      console.log("Post ID: " + created.id + " created.");
    });
  } catch (error) {
    console.log(error);
    console.log("====================");
    console.log("Seeding failed ❌");
    console.log("====================");
  } finally {
    console.log("====================");
    console.log("Seeding complete ✅");
    console.log("====================");
  }
};

// seed();
