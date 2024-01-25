export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-4xl p-5">
        <p className="text-center text-zinc-500/80 dark:text-zinc-400/80">
          Khurram Ali &copy; {new Date().getFullYear()} | KhrmBlog
        </p>
      </div>
    </footer>
  );
};
