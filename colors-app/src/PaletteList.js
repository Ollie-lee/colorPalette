import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Minipalette from './Minipalette'
import { withStyles } from '@material-ui/core/styles';
import Palette from './Palette';
import styles from './styles/PaletteListStyle'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
class PaletteList extends Component {

  state = {
    openDeleteDialog: false,
    selectedId: -1,
  }

  openDialog = () => {
    this.setState({ openDeleteDialog: true })
  }

  deleteDialog = () => {
    this.setState({ openDeleteDialog: false, selectedId: -1 })
  }

  goToPalette = (id) => {
    this.props.history.push(`/palette/${id}`)
  }

  updateSelectedId = (newId) => {
    this.setState({ selectedId: newId })
  }

  handleDeleteIcon = () => {
    this.props.deletePalette(this.state.selectedId)
    this.deleteDialog()
  }

  render() {
    const { palettes, classes, deletePalette } = this.props;
    const { openDeleteDialog, selectedId } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            {/* header */}
            <h1>React Colors</h1>
            <Link to='/palette/new'>Create palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {/* bunch of palettes */}
            {palettes.map(palette =>
              <CSSTransition
                key={palette.id}
                classNames='fade'
                timeout={500}
              >
                <Minipalette {...palette}
                  goToPalette={() => this.goToPalette(palette.id)}
                  deletePalette={deletePalette}
                  key={palette.id}
                  openDialog={this.openDialog}
                  updateSelectedId={this.updateSelectedId}
                  // onClick={() => this.updateSelectedId(palette.id)}
                />
              </CSSTransition>
            )}
          </TransitionGroup>
        </div>

        <Dialog open={openDeleteDialog}
          aria-labelledby='delete-dialog-title'
          onClose={this.deleteDialog}
        >
          <DialogTitle
            id='delete-dialog-title'
          >Delete this palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDeleteIcon}>
              <ListItemAvatar>
                <Avatar style={{
                  background: blue[100],
                  color: blue[600]
                }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>
                Delete
              </ListItemText>
            </ListItem>
            <ListItem button onClick={() => this.deleteDialog()}>
              <ListItemAvatar>
                <Avatar style={{
                  background: red[100],
                  color: red[600]
                }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>
                Cancel
              </ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList)
