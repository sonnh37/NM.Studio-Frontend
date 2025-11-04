import { mock } from "@/sample";

export type Post = {
  title: string;
  content: string;
  cover: string;
  author: string;
  readingTime: number;
  createdAt: string;
};

const getPost = (): Promise<Post> => {
  return new Promise<Post>((resolve, reject) => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        try {
          const data = localStorage.getItem("post");
          const parsed: Post = data ? JSON.parse(data) : mock;

          if (!data) {
            savePost(mock);
          }

          return resolve(parsed);
        } catch {
          return reject();
        }
      }

      return resolve(mock);
    }, 200);
  });
};

const savePost = (data: Partial<Post>): void => {
  if (typeof window === "undefined") return;

  try {
    const value: Post = data?.content?.trim() ? { ...mock, ...data } : mock;
    localStorage.setItem("post", JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const postService = {
  get: getPost,
  save: savePost,
};

export default postService;
