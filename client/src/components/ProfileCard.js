import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import {
  PinDropRounded,
  Phone,
  AlternateEmail,
  GitHub,
} from "@material-ui/icons"

import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  btn: {
    ...theme.typography.btn1,
    fontSize: "0.9rem",
    height: 45,
    width: 145,
  },
}))

export default function OutlinedCard({ data }) {
  const classes = useStyles()

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Hii Welcome
        </Typography>
        <Typography variant="h2" component="h2">
          {data.name}
        </Typography>

        <CardActions className={classes.pos} style={{ padding: 0 }}>
          <Button style={{ padding: "unset" }} color="primary">
            <Phone /> {data.phone}
          </Button>
          <Button color="primary">
            <AlternateEmail />
            {data.email}
          </Button>
        </CardActions>
        <Typography variant="h5" className={classes.pos} color="textSecondary">
          Age- {data.age} Experience- {data.experience} Degree- {data.higherDeg}
        </Typography>
        <Typography variant="h5" className={classes.pos} color="textSecondary">
          <PinDropRounded /> {data.county}- {data.city}
        </Typography>
        <CardActions className={classes.pos} style={{ padding: 0 }}>
          Skills
          {data.skills.split(",").map((skl) => (
            <Button style={{ padding: "unset" }} color="primary">
              {skl}
            </Button>
          ))}
        </CardActions>
        <Typography variant="body2" component="p">
          {data.lat} - {data.long}
        </Typography>
        <Typography variant="body2" component="p">
          <Button style={{ padding: "unset" }} color="primary">
            <GitHub /> {data.gitHub}
          </Button>
        </Typography>
      </CardContent>
      <CardActions style={{ float: "right" }}>
        {data.isEmployer ? (
          <>
            <Button
              component={Link}
              to="/appliedJob"
              variant="outlined"
              className={classes.btn}
            >
              <span style={{ marginRight: 10 }}>Applied Jobs </span>
            </Button>
            <Button
              component={Link}
              to="/addJob"
              variant="outlined"
              className={classes.btn}
            >
              <span style={{ marginRight: 10 }}>Add jobs </span>
            </Button>
          </>
        ) : null}
        <Button
          component={Link}
          to="/editProfile"
          variant="outlined"
          className={classes.btn}
        >
          <span style={{ marginRight: 10 }}>Edit Profile </span>
        </Button>
      </CardActions>
    </Card>
  )
}
