import * as React from 'react';
import Navbar from '../HomeComponents/navbar';
import Container from 'react-bootstrap/Container';
import Footer from '../HomeComponents/footer';
import Col from 'react-bootstrap/Col';
import './Results/dashboard.css';
import { Link } from 'react-router-dom';
import leftImg from '../../../assets/leftarrow.png';
import seekleft from '../../../assets/seekleft.png';
import seekright from '../../../assets/seekright.png';
import { useState,useEffect } from 'react';
import '../../Home/Home/animate.css';
import axios from 'axios';
import { API } from '../../../config';
import Sidebar from './Results/SideBar';
import { MainBody } from './Results//MainBody';
import { dashboardContext } from '../../../createContext';



interface IAppProps {
}
export interface DashboardState {
  sideBarIsOpen?:Boolean,
  token?:string,
  result?:string,
  title?:string,
  sidelink1?:boolean,
  sidelink2?:boolean
  sidelink3?:boolean,
  sidelink4?:boolean,
  sidelink5?:boolean
  sidelink6?:boolean,
  sidelink7?:boolean,
}

const RulesForSuccess: React.FunctionComponent<IAppProps> = (props:any) => {
  const [ state,updateState ] = useState<DashboardState>({
    sideBarIsOpen:false,
    token:'',
    result:'',
    title:'Personality Type'
  })
  const { sideBarIsOpen,result,title } = state;
  useEffect(()=>{
    window.scrollTo(-0,-0)
    const availableToken = sessionStorage.getItem('userToken')
    const token = availableToken?JSON.parse(availableToken):props.history.push('/signin')
    axios.get(`${API}/freedashboard`, { headers: { 'Authorization': `Token ${token}` } })
    .then(response=>{
      if(response.status === 200){
          updateState({...state,result:response.data[0].career_personality_type,token:token,})
      }
    })
    .catch(error=>{
    })

  },[])
  
    return (
      <React.Fragment>
            <Navbar/>
              <Container fluid={true}>
                  <Col md={10} className="shiftcent">
                    <div className="dashboardwrap">
                      <dashboardContext.Provider value={{...state,updateState}}>
                        <Sidebar result={result}/>
                        <MainBody result={result}/>
                      </dashboardContext.Provider>
                      </div> 
                      <div>
                    </div>
                  </Col>
                <Footer/>
            </Container>
      </React.Fragment>
  );
};

export default RulesForSuccess;
