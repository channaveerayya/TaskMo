import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  AppBar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { makeStyles, useTheme } from "@material-ui/styles"
import MenuIcon from "@material-ui/icons/Menu"
import { routes, guestRoutes } from "../utils/constants"
import { logout } from "../actions/auth"

function ElevationScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "4.5em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5.25em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },

  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    width: "50px",
    height: "50px",
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
    padding: 10,
  },
}))

const Header = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down("sm"))
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [openDrawer, setOpenDrawer] = useState(false)

  const [value, setValue] = useState(
    isAuthenticated
      ? routes.findIndex((tr) => tr.link === window.location.pathname)
      : guestRoutes.findIndex((tr) => tr.link === window.location.pathname)
  )

  const handleChange = (e, value) => {
    if (routes[value].name === "Logout") {
      logout()
    }
    setValue(value)
  }

  const setRoutes = () => {
    let index = isAuthenticated
      ? routes.findIndex((tr) => tr.link === window.location.pathname)
      : guestRoutes.findIndex((tr) => tr.link === window.location.pathname)
    setValue(index)
  }

  useEffect(() => {
    setRoutes()
  }, [])

  const tabs = (
    <Tabs
      value={value}
      onChange={handleChange}
      className={classes.tabContainer}
      indicatorColor="primary"
    >
      {isAuthenticated
        ? routes.map((rt, i) => (
            <Tab
              key={i}
              label={rt.name}
              component={Link}
              to={rt.link}
              className={classes.tab}
            />
          ))
        : guestRoutes.map((rt, i) => (
            <Tab
              key={i}
              label={rt.name}
              component={Link}
              to={rt.link}
              className={classes.tab}
            />
          ))}
    </Tabs>
  )

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {isAuthenticated ? (
            <ListItem
              component={Link}
              to="/addJob"
              divider
              button
              onClick={() => setOpenDrawer(false)}
              className={classes.drawerItem}
            >
              <ListItemText disableTypography>add Job</ListItemText>
            </ListItem>
          ) : null}
          {isAuthenticated
            ? routes.map((rt, i) => (
                <ListItem
                  key={i}
                  component={Link}
                  to={rt.link}
                  divider
                  button
                  onClick={() => setOpenDrawer(false)}
                  className={classes.drawerItem}
                >
                  <ListItemText disableTypography>{rt.name}</ListItemText>
                </ListItem>
              ))
            : guestRoutes.map((rt, i) => (
                <ListItem
                  key={i}
                  component={Link}
                  to={rt.link}
                  divider
                  button
                  onClick={() => setOpenDrawer(false)}
                  className={classes.drawerItem}
                >
                  <ListItemText disableTypography>{rt.name}</ListItemText>
                </ListItem>
              ))}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  )
  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar disableGutters>
            <Button
              disableRipple
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
            >
              <Typography variant="h1">Task Mo</Typography>
            </Button>
            {!loading && matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  )
}

Header.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Header)
