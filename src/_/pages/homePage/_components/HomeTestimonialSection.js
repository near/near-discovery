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
    fullName: "Saidul Badhon",
    username: "@saidulbadhon.near",
    quote: `Hey, chooms! After patch 1.62 for 
        @CyberpunkGame
        , the folder location for the Photo Mode pictures has changed. Now you can find them in "%userprofile%\Documents\CD Projekt Red\Cyberpunk 2077\screenshots" – we are looking into bringing them back to their original folder location.`,
  },
  {
    fullName: "deCode",
    username: "@deCode666",
    quote: `OK, one thing, if I may. Is this happening also to other people using the Overdrive only for the PM? Some shots look good, others have this weird "granular" quality to them ... IDK.`,
  },
  {
    fullName: "Gloss",
    username: "@glossolalia3301",
    quote: `Virtual photographer. Fluent in Polish and English, learning Ukrainian. | ⚢ she/they`,
  },
  {
    fullName: "Saidul Badhon",
    username: "@saidulbadhon.near",
    quote: `Hey, chooms! After patch 1.62 for 
      @CyberpunkGame
      , the folder location for the Photo Mode pictures has changed. Now you can find them in "%userprofile%\Documents\CD Projekt Red\Cyberpunk 2077\screenshots" – we are looking into bringing them back to their original folder location.`,
  },
  {
    fullName: "Gloss",
    username: "@glossolalia3301",
    quote: `Virtual photographer. Fluent in Polish and English, learning Ukrainian. | ⚢ she/they`,
  },
  {
    fullName: "deCode",
    username: "@deCode666",
    quote: `OK, one thing, if I may. Is this happening also to other people using the Overdrive only for the PM? Some shots look good, others have this weird "granular" quality to them ... IDK.`,
  },
  {
    fullName: "Gloss",
    username: "@glossolalia3301",
    quote: `Virtual photographer. Fluent in Polish and English, learning Ukrainian. | ⚢ she/they`,
  },
  {
    fullName: "Gloss",
    username: "@glossolalia3301",
    quote: `Virtual photographer. Fluent in Polish and English, learning Ukrainian. | ⚢ she/they`,
  },
  {
    fullName: "deCode",
    username: "@deCode666",
    quote: `OK, one thing, if I may. Is this happening also to other people using the Overdrive only for the PM? Some shots look good, others have this weird "granular" quality to them ... IDK.`,
  },
  {
    fullName: "Saidul Badhon",
    username: "@saidulbadhon.near",
    quote: `Hey, chooms! After patch 1.62 for 
          @CyberpunkGame
          , the folder location for the Photo Mode pictures has changed. Now you can find them in "%userprofile%\Documents\CD Projekt Red\Cyberpunk 2077\screenshots" – we are looking into bringing them back to their original folder location.`,
  },
  {
    fullName: "Gloss",
    username: "@glossolalia3301",
    quote: `Virtual photographer. Fluent in Polish and English, learning Ukrainian. | ⚢ she/they`,
  },
  {
    fullName: "Gloss",
    username: "@glossolalia3301",
    quote: `Virtual photographer. Fluent in Polish and English, learning Ukrainian. | ⚢ she/they`,
  },
  {
    fullName: "Gloss",
    username: "@glossolalia3301",
    quote: `Virtual photographer. Fluent in Polish and English, learning Ukrainian. | ⚢ she/they`,
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
