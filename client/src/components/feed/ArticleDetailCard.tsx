import { FC } from "react";

type ArticleDetailProps = {
  title?: string;
  className?: string;
};

const ArticleDetailCard: FC<ArticleDetailProps> = ({}) => {
  return (
    <div className="article-detail-card flex justify-start items-center flex-col">
      <div className="article-detail-card-top">
        <a
          href="/"
          className="article-detail-card-top__image"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/practicaldev/image/fetch/s--jyXrn67N--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ts3q02co540scso4asc7.png)",
          }}
        >
          &nbsp;
        </a>
      </div>
      <div className="article-detail-card-body flex justify-start items-start flex-col">
        <div className="article-detail-card-body__profile flex justify-start items-center">
          <div className="profile-image-container">
            <a
              href="/"
              className="profile-image-container__image"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1646428826686-c800028a0619?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60)",
              }}
            >
              &nbsp;
            </a>
          </div>
          <div className="profile-info flex justify-start flex-col">
            <h1>Jason Taylor</h1>
            <div>
              <p>Posted on Mar 7</p>
            </div>
          </div>
        </div>

        <div className="article-detail-card-body__header">
          <h1>10 amazing games to learn CSS</h1>
        </div>

        <div className="article-detail-card-body__tags flex justify-start items-center">
          <div className="tag">
            <span>#</span>react
          </div>
          <div className="tag">
            <span>#</span>react
          </div>
          <div className="tag">
            <span>#</span>react
          </div>
        </div>

        <div className="article-detail-card-body__content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          dignissimos molestiae doloribus quis facere esse, voluptate magni
          aliquam. Explicabo, veritatis aut tempora qui quas quod dicta
          doloremque sed nisi illo? Atque aliquam eius laudantium. Aut
          voluptatum voluptatem quaerat sequi, ad iure, assumenda vel, ipsum
          earum molestiae quod. Voluptatem laboriosam esse, ducimus pariatur eos
          assumenda ipsa aliquid harum nobis ad excepturi. Aspernatur, fugit
          esse repellat odit voluptates inventore quos sunt temporibus, sit
          dolorem amet error ipsum debitis quas veniam repellendus? Assumenda
          nemo id recusandae necessitatibus sunt ratione amet ipsum eaque et!
          Corporis qui in, consequuntur minus error sapiente nulla nihil
          accusantium asperiores doloribus repellat soluta quaerat magnam,
          dolore aliquam doloremque libero obcaecati voluptas quae dicta,
          veritatis voluptatem alias rem atque. Cupiditate? Consectetur dolore
          quisquam quas quod voluptatibus nesciunt. Mollitia dignissimos rerum
          modi iure sed autem maxime quod fuga sint distinctio enim voluptates
          quis, tempore ipsum! Eveniet ad provident sapiente voluptate
          voluptates! Sed unde obcaecati ipsum illo officia at eveniet. Illum
          culpa unde accusantium cumque doloribus maxime quas earum
          exercitationem distinctio quod odio, atque explicabo voluptatum autem
          enim libero dolores voluptatem at! Quod voluptatem unde similique quia
          repellat, nam placeat adipisci, totam aliquid explicabo facilis facere
          mollitia provident harum recusandae dolores! Vel quam assumenda
          quibusdam qui nostrum voluptates minima illum laboriosam quod! Quas
          aliquid impedit labore quasi quis dolore numquam magni eos iusto,
          repellat veniam exercitationem cumque blanditiis, odit dolores, minus
          accusamus minima libero debitis unde dignissimos illum. Ab quisquam
          neque dignissimos? Necessitatibus minima dolorum officiis vitae
          ratione sit atque quas at, consectetur cumque. Quam, tenetur hic. Sunt
          commodi eum excepturi veniam, facere magni necessitatibus perferendis
          aspernatur voluptas temporibus? Ducimus, expedita consectetur.
          Laudantium, quia earum. Dolor nam accusantium commodi inventore fugiat
          tempore non est molestiae, rem omnis quia culpa, dignissimos nobis
          eaque! Adipisci, illo aut! Dolorem perferendis voluptatum harum
          consequatur exercitationem alias? Cumque odit architecto natus minus
          laudantium ipsum delectus dolore, laboriosam ex aliquam, assumenda
          illum aliquid, sequi provident molestiae harum officiis ipsam nobis
          accusantium nihil. Enim optio neque praesentium velit eum! Quae,
          asperiores. Sit consequatur impedit quae pariatur dolores quas saepe
          cupiditate tempore tenetur, sed dolorem asperiores debitis labore iste
          unde ea adipisci ab vero optio, repellat in. Earum, accusamus aliquam!
          Laboriosam laborum nam aperiam commodi, eveniet, dolore ea alias
          quidem quis exercitationem natus illum obcaecati reprehenderit
          provident laudantium harum assumenda iste esse saepe, incidunt sint
          recusandae libero nihil. Cupiditate, nihil. Assumenda ex nemo
          repellendus ipsum, delectus harum, quis iusto magni sed repudiandae,
          natus repellat corrupti optio. Eius minima dolorum praesentium
          veritatis libero quod molestias, fugit provident a, at rerum quidem.
          Dolorum, ab modi. Soluta assumenda non rem quibusdam, exercitationem
          repellendus accusamus dolor possimus tempora. Veniam accusamus iusto
          adipisci possimus deserunt quae magni officiis iure porro, totam,
          voluptates, cum asperiores quia. Recusandae labore tempora deserunt
          beatae possimus necessitatibus accusamus adipisci dicta obcaecati
          earum vitae perspiciatis asperiores debitis, in iure tempore ea
          dolore, eos quis harum quasi culpa enim. Esse, optio natus! Tempore ea
          nostrum ducimus, voluptates nobis minus pariatur reprehenderit!
          Sapiente consequuntur hic quae maxime! Voluptatum doloribus nostrum
          harum blanditiis, molestias dicta tempore praesentium eveniet neque
          quae fugit corporis, totam provident. Esse, sed distinctio eum
          perferendis doloribus maxime deserunt voluptas. Asperiores
          reprehenderit, temporibus debitis itaque sunt hic amet autem, saepe
          aliquam iste fugiat? Non reprehenderit natus, atque error dolor
          deserunt eveniet. Modi aperiam laboriosam eveniet vitae temporibus
          quis, itaque minus quam odit, eligendi eos, optio harum nemo sint
          error! Nam voluptatibus, magnam a laudantium eius beatae repudiandae
          vero magni dolore optio! Doloremque est libero nisi tempora ratione
          temporibus ducimus animi quia quasi quo, adipisci expedita saepe,
          facere reprehenderit aliquid asperiores in minima mollitia consectetur
          fugit sunt dolore explicabo ipsa? Eveniet, dignissimos?
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailCard;
