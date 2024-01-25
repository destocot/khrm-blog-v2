import { Post, Tag, User } from "@prisma/client";
import { PostContent } from "./PostContent";
import { PostImage } from "./PostImage";
import { PostTags } from "./PostTags";

interface PostProps {
  post: Post & {
    tags: Tag[];
    author: User;
  };
}

export const PostItem = ({
  post: { title, image, body, slug, author, createdAt, tags },
}: PostProps) => {
  return (
    <div className="shadow-custom hover:border-border border-transparent border flex gap-5 rounded overflow-hidden dark:shadow-muted">
      <PostImage slug={slug} image={image} title={title} />
      <div className="grow flex flex-col gap-2 justify-between p-3">
        <PostContent slug={slug} title={title} body={body} />
        <PostTags
          tags={tags}
          createdAt={createdAt}
          author={author}
          slug={slug}
        />
      </div>
    </div>
  );
};
