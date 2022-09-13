const PostMenu = () => {
  return (
    <div className="post-menu">
      <div className="card-menu">
        <ul>
          <li>Condividi</li>
          <li>Sava in pdf</li>
          <li>Stampa</li>
          <li>Ascolta l'audio</li>
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
    </div>
  );
};

export default PostMenu;
