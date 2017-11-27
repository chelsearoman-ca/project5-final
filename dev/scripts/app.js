import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class App extends React.Component {
  render() {
    return (
      <div>
        <Heading/>
      </div>
    )
  }
}


class Heading extends React.Component{
  constructor(){
    super(); //sets up the default state for our app. this is that data that will change over time. 
    this.state = {
      apiURL: 'https://jobs.github.com/positions.json',
      posting: [], //sets the default state\
      searchValue: '' //
    }
    this.getJobs = this.getJobs.bind(this);
    this.setPosting = this.setPosting.bind(this);
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  getJobs (query) {
    let startingSearch ='';
    if(query){
      startingSearch = '?search='+ query;
      } 
    axios({
      method:'GET',
      url: 'https://proxy.hackeryou.com',
      dataResponse:'json',
      params: {
        reqUrl: `${this.state.apiURL}${startingSearch}`,
        full_time: true //you open the app 
      }
      }).then((res) => {
        const posting = res.data
        this.setPosting(posting)
       
      }).catch((err)=>{
       
      })
  }

  
  setPosting(posting){
    this.setState({posting})
  }
  updateSearchValue(e){
    const currentSearchValue = e.target.value 
    this.setState({searchValue: currentSearchValue})// this is the value of the change event that happens in the input and storing or constantly updating our state with it
  }

  searchSubmit(){
    // this.state.searchValue;
    // this.getJobs(this.state.searchValue)
    this.getJobs(this.state.searchValue);
  }

  componentDidMount(){
    this.getJobs();
  }
  render(){ //called any time state changes and any time the page loads
    return (
      <main>
        <div className ="top">
            <h1>Dev Jobs</h1>
            <input placeholder="Ruby, Python, etc"type="text" value={this.state.searchValue} onChange={(e)=>{this.updateSearchValue(e)}}/> {/*functions live outside of your state*/}
            <button id="button" onClick={()=>{this.searchSubmit()}}>Search</button>
            <p>Made with the Github Jobs API</p>
        </div>
        <ul className="data">
          {/* here we are mapping through our state obj to rend an array of components */}
          {this.state.posting.map((company, index)=>{ //map gives us back a new array
            return <Job key={company.id} data={company}/> //map through the state and for every person return the Job Component
          })}
        </ul>
      </main>
    )
  }
}

const Job = (props)=>{
  // console.log(props.data)
  return (
      <ul className ="jobItem">
        <li className="jobTitle">
          {props.data.title}
          <ul className="companyInfo">
            <li className="companyName">{props.data.company}</li>
            <p> 
              <a href ={`${props.data.url}`} target="_blank">See Full Posting</a>
            </p>
          </ul>
        </li>
      </ul>
  )
}


ReactDOM.render(<App />, document.getElementById('app'));

// -PSEUDOCODE

// 1. Make a call to Github Job API to retrieve a list of REMOTE job positions
// 2. Display jobs
// 3. Ability to narrow by position


// Stretch
// 5. Allow users to save jobs for later in a to do list on side 
// 6. User Auth?


//