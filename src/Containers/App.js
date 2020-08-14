import React, { Component } from 'react';
import CardList from '../Components/CardList';
//import {robots} from './robots';
import SearchBox from '../Components/SearchBox';
//import { render } from '@testing-library/react';
import './App.css';
import Scroll from '../Components/Scroll';
import {connect} from 'react-redux'
import {setSearchField, requestRobots} from '../actions';

const mapStateToProps = state => {
  return{
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSeacrchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRobotsRequest: () => dispatch(requestRobots())
  }
}

class App extends Component {


  componentDidMount(){
    this.props.onRobotsRequest();

  }

  render () {
   // const {robots} = this.state;
    const {searchField, onSeacrchChange, robots, isPending} = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase());
    })
    return isPending?
      <h1>Loading...</h1>:
    
      (
          <div className='tc'>
            <h1 className='f2'>Robofriends</h1>
            <SearchBox searchChange={onSeacrchChange}></SearchBox>
            <Scroll>
              <CardList robots={filteredRobots}/>
            </Scroll>
          </div>
      )
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(App);