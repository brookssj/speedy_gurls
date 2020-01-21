import React, { Component } from "react";
import { NewMemory } from "../modules/NewPostInput.js";


import { get, post } from "../../utilities";
import SingleMemory from "../modules/SingleMemory.js";

//somehow get theme id?? 

class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: [],
    };
  }

  // called when the "Theme" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "Theme";
    // post("api/whattheme", this._id),then((theme) => {
    //     console.log(this._id)
    // })
    get("/api/memory", {parent: this.props.themeId}).then((memoryObjs) => {
      let reversedMemoryObjs = memoryObjs.reverse();
      reversedMemoryObjs.map((memoryObj) => {
        this.setState({ memories: this.state.memories.concat([memoryObj]) });
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewMemory = (memoryObj) => {
    this.setState({
      memories: [memoryObj].concat(this.state.memories),
    });
  };

  render() {
    let memoriesList = null;
    const hasMemories = this.state.memories.length !== 0;
    if (hasMemories) {
      memoriesList = this.state.memories.map((memoryObj) => (
        <SingleMemory
          key={`SingleMemory_${memoryObj._id}`}
          _id={memoryObj._id}
          creator_name={memoryObj.creator_name}
          creator_id={memoryObj.creator_id}
          content={memoryObj.content}
          userId={this.props.userId}
        />
      ));
    } else {
      memoriesList = <div>No memories!</div>;
    }
    return (
      <>
        {<NewMemory themeId={this.props.themeId} addNewMemory={this.addNewMemory} />}
        {memoriesList}
      </>
    );
  }
}

export default Theme;
