import jsonData from "../books/rsnd1.json";
import Link from "next/link";

type PostMenuProps = {
  currentPostTitle: string;
};

const PostMenu: React.FC<PostMenuProps> = ({ currentPostTitle }) => {
  return (
    <div className="post-menu">
      <div className="card-menu">
        <ul>
          <li>Condividi</li>
          <li>Sava in pdf</li>
          <li>Stampa</li>
          <li>Ascolta l&apos;audio</li>
          <li>Dimensione del testo</li>
        </ul>
      </div>
      <div className="card-menu dark desktop">
        <ul>
          <li>
            <a href="#cenni-storici">Vai ai cenni storici</a>
          </li>
          <li>
            <a href="#note">Vai alle note</a>
          </li>
        </ul>
      </div>

      <div className="card-menu desktop">
        <h3>Glossario</h3>
      </div>

      <div className="card-menu desktop gosho">
        <h3>Scritti</h3>
        <ul className="gosho-list">
          {jsonData
            .sort((a, b) => (a.data > b.data ? 1 : -1))
            .map((post, index) => (
              <li
                key={post.title}
                className={post.title === currentPostTitle ? "active" : ""}
              >
                <Link href={`/posts/${post.slug}`}>
                  <a>
                    {index + 1}. {post.title}
                  </a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PostMenu;
