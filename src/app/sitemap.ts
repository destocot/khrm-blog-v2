import prisma from "@/lib/db";

export default async function sitemap() {
  const posts = await prisma.post.findMany({
    select: { slug: true, updatedAt: true },
  });

  const postUrls = posts.map((post) => {
    return {
      url: `https://khrmblog.vercel.app/posts/view/${post.slug}`,
      lastModified: post.updatedAt,
    };
  });

  return [
    {
      url: "https://khrmblog.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://khrmblog.vercel.app/posts",
      lastModified: new Date(),
    },
    {
      url: "https://khrmblog.vercel.app/posts/search",
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}
