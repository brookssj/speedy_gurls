import React, { Component } from "react";
import { NewMemory } from "../modules/NewPostInput.js";

import { get } from "../../utilities";
import SingleMemory from "./SingleMemory";

class SingleTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: [],
    };
  }

  // called when the "SingleTheme" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "Theme";
    get("/api/memories").then((memoryObjs) => {
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
        {<NewMemory addNewMemory={this.addNewMemory} />}
        {memoriesList}
      </>
    );
  }
}

export default SingleTheme;
