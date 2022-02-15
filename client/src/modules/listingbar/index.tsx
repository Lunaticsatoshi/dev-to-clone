import { FC } from "react";
import Link from "next/link";
import { ListingBar, ListingCard, ListingHeader } from "src/components";

const listings = [
  {
    id: 1,
    mainTitle: "Go/JS/PHP Software engineer looking for new opportunities",
    subText: "forHire",
  },
  {
    id: 2,
    mainTitle: "Live-Coding on YouTube continues tomorrow",
    subText: "events",
  },
  {
    id: 3,
    mainTitle: "Product Designer",
    subText: "jobs",
  },
  {
    id: 4,
    mainTitle: "FREE COURSE, this weekend only: Ship better code faster",
    subText: "education",
  },
  {
    id: 5,
    mainTitle: "MEAN / MERN Stack 100+ Learning Resources {FREE}",
    subText: "misc",
  },
];
const news = [
  {
    id: 1,
    mainTitle: "Game Dev Digest — Issue #83 - How and Why",

    newarticle: true,
  },
  {
    id: 2,
    mainTitle: "JavaScript News and Updates of February 2021",

    newarticle: true,
  },
  {
    id: 3,
    mainTitle: "🗞 What's new and special in Create Go App CLI v1.7.0?",

    newarticle: true,
  },
  {
    id: 4,
    mainTitle:
      "Google’s Termination of Dr. Mitchell, Clubhouse Security, Low-Code Tools, & more on DevNews!",
    subText: "1 comment",
    newarticle: false,
  },
  {
    id: 5,
    mainTitle: "Ember 3.25 Released",

    newarticle: true,
  },
];

const help = [
  {
    id: 1,
    mainTitle: "How to start a programming blog?",

    newarticle: true,
  },
  {
    id: 2,
    mainTitle: "How to use @yarnpkg/core?",
    subText: "2 comments",
    newarticle: false,
  },
  {
    id: 3,
    mainTitle: "Need advice regarding web development",
    subText: "5 comments",

    newarticle: false,
  },
];

type ListingbarProps = {
  className?: string;
};

const index: FC<ListingbarProps> = ({}) => {
  return (
    <>
      <ListingBar>
        <ListingHeader>
          <p>
            <img
              src="https://res.cloudinary.com/practicaldev/image/fetch/s--KSi8rL3T--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_350/https://res.cloudinary.com/practicaldev/image/fetch/s--3GWkSFQs--/c_fill%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_420/https://dev-to-uploads.s3.amazonaws.com/uploads/podcast/image/346/5b0bd095-4a8c-4449-a43d-9e9b154b9d09.png"
              alt="header-image"
            />
          </p>
          <h2>
            <Link href="/#" passHref>
              <a>Hack the Planet with New Relic & DEV</a>
            </Link>
          </h2>

          <p>
            Use New Relic to build a climate-change observability app for the
            chance to win up to $5,000!
            <strong>
              <a href="/#">&nbsp;join the hackathon</a>
            </strong>
          </p>
        </ListingHeader>

        <ListingCard header="Listings" articles={listings} />
        <ListingCard header="#news" articles={news} />
        <ListingCard header="#help" articles={help} />
      </ListingBar>
    </>
  );
};

export default index;
