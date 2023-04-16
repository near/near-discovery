import { Box } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Masonry } from "@mui/lab";

const testimonies = [
  {
    fullName: "Cameron.near",
    username: "@Cameron_Dennis_",
    quote: `So proud of @zahidsharp for launching @NEARpad and getting accepted to @_buildspace season 3! Keep your eye on NEARpad to ship the best platform to host frontends onchain and getting one step closer to real decentralization in web3 🚀🚀🚀`,
  },
  {
    fullName: "Saidul Badhon",
    username: "@saidulbadhon.near",
    quote: `Just discovered @NEARpad and it's a game-changer for #dApp developers! Creating, publishing, and monetizing smart contracts and UI components has never been easier. Say goodbye to development headaches and hello to seamless integration. #blockchain #near #bos #dapps`,
  },
  {
    fullName: "b00!",
    username: "@alexpenadev",
    quote: `Looking for an intuitive, all-in-one #blockchain development tool? Check out @NearPad. It's easy to create, publish, and monetize smart contracts and UI components with this platform. Join the #dApp revolution today! #crypto #near #web3`,
  },
  {
    fullName: "Cygnus Dynamics",
    username: "@cygnus-dynamics",
    quote: `As a startup founder, I need tools that help me move fast and build with confidence. @NearPad is a game-changer for my team. It streamlines our #dApp development process and enables us to monetize our creations easily. Highly recommend! #startup #crypto`,
  },
  {
    fullName: "Miguel Rodriguez",
    username: "@deCode666",
    quote: `Working with #blockchain technology can be challenging, but @NearPad makes it a breeze. As a web developer, I appreciate how easy it is to create, publish, and monetize smart contracts and UI components with this platform. Try it out and see for yourself! #webdev #dApp`,
  },
  {
    fullName: "Samantha Lee",
    username: "@samantha.lee",
    quote: `Developing on the blockchain just got easier with #NearPad from @nearprotocol. As a developer, I love the ability to create and publish smart contracts and UI components seamlessly. With NEARPad, I'm able to monetize my creations easily, too. Give it a try! #blockchain #dApp`,
  },
];

export default function HomeTestimonialSection() {
  const { theme, bp } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        backgroundColor: theme.backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: bp ? 5 : 10,
        gap: 5,
        width: "100%",
      }}
    >
      <Typography sx={{ color: theme.textColor }} align="center" variant="h2">
        What people are saying about nearpad
      </Typography>

      {/* <Typography sx={{ color: theme.textColor3 }} variant="p">
        blah blah blah blah blah blah blah blah blah blah blah blah blah blah
        blah blah blah
      </Typography> */}

      <Box style={{ width: "100%", maxWidth: 1250 }}>
        {bp ? (
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column", px: 2 }}>
            {testimonies?.map((item, index) => (
              <TestimonialItem key={index} {...item} />
            ))}
          </Box>
        ) : (
          <Masonry columns={3} spacing={2} sx={{ px: 2 }}>
            {testimonies?.map((item, index) => (
              <TestimonialItem key={index} {...item} />
            ))}
          </Masonry>
        )}
      </Box>
    </Box>
  );
}

const TestimonialItem = ({ fullName, avatar, username, quote }) => {
  const { theme, bp } = useContext(ThemeContext);

  return (
    <Card
      sx={{
        maxWidth: "100%",
        boxShadow: "none",
        backgroundColor: theme.ui,
      }}
    >
      <CardHeader
        avatar={
          <Avatar src={avatar} aria-label="recipe">
            {fullName[0]}
          </Avatar>
        }
        action={
          <IconButton disableRipple disabled>
            <TwitterIcon sx={{ fill: "#03a9f4" }} />
          </IconButton>
        }
        title={
          <Typography variant="h6" sx={{ color: theme.textColor }}>
            {fullName}
          </Typography>
        }
        subheader={
          <Typography
            variant="p2"
            fontWeight={400}
            sx={{ color: theme.textColor3 }}
          >
            {username}
          </Typography>
        }
      />

      <CardContent style={{ padding: "0 16px 16px 16px" }}>
        <Typography
          variant="p1"
          sx={{ color: theme.textColor2, fontWeight: 400 }}
        >
          {quote}
        </Typography>
      </CardContent>
    </Card>
  );
};
