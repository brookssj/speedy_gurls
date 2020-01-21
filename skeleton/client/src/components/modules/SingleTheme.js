import React, { Component } from "react";
import { NewMemory } from "../modules/NewPostInput.js";
import { Link } from "@reach/router";


import { get } from "../../utilities";

class SingleTheme extends Component {
  constructor(props) {
    super(props);
  }

// componentDidMount() {  
//   get("/api/memory").then((memoryObjs) => {
//     let reversedMemoryObjs = memoryObjs.reverse();
//     reversedMemoryObjs.map((memoryObj) => {
//       this.setState({ memories: this.state.memories.concat([memoryObj]) });
//     });
//   });
// }  
 
 render() { 
    return (
        <div>
            {/* <Router>
                <Theme path={`/theme/${this.props._id}`}/>
            </Router> */}
            
        </div>
    );
  }
}

export default SingleTheme;
