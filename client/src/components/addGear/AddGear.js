import { Box, Button, Container, Stack, Step, StepButton, Stepper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddLocation from './addLocation/AddLocation';
import AddDetails from './addDetails/AddDetails';
import AddImages from './addImages/AddImages';
import { useValue } from '../../context/ContextProvider';
import { Cancel, Send } from '@mui/icons-material';
import { clearGear, createGear } from '../../actions/gear';
import { useNavigate } from 'react-router-dom';

// Adding gear on the website 
// 

const AddGear = () => {
    const {state:{images, details, location, currentUser, updatedGear, deletedImages, addedImages}, dispatch}= useValue(); // importing data from the sates
    const [activeStep, setActiveStep] = useState(0); // the state of the step defualt value 0 
    const [steps, setSteps] = useState([
        // the steps for adding gear and the details, can add category 
        {label: 'Location', completed: false}, 
        {label: 'Details', completed: false},
        {label: 'Images', completed: false}, // cerating the steps array of object 0, 1 , 2
    ]);

    const [showSubmit, setShowSubmit] = useState(false); // state for the submit button by default it is false

    const handleNext = ()=>{ // if the active step is not the last one then 
        if(activeStep < steps.length -1 ){
            setActiveStep(activeStep => activeStep + 1 ) // set active step to plus on 
        }else{
            const stepIndex = findUnfinished() // if last step then find unfinished 
            setActiveStep(stepIndex) // set the unfinished step to index
        }
    };

    const checkDisabled = ()=>{
        if(!activeStep < steps.length -1 )return false // first checks if the active step is not the last one stops execution as it is not the last one 
        const index = findUnfinished() //find the index of unfinished step
        if(index !== -1) return false // if index is not last one then stop
        return true // if it is -1 then fnish 
    };

    const findUnfinished = ()=>{
        return steps.findIndex(step => !step.completed) // find to see if the step is finished 
    };

    useEffect(()=>{ //if there is a change in the images array checks the array 
        if(images.length){
            if(!steps[2].completed) setComplete(2, true); // check if step 2 is not completed change the state to true 
        }else{
            if(steps[2].completed) setComplete(2, false); // in case there are no images check if true an change to false
        }
    },[images]);

    const setComplete = (index, status) => {
        setSteps(steps=>{ //recieving all the steps
            steps[index].completed  = status // true or false
            return [...steps]; 
        })
    };
    useEffect(()=>{
        if(details.title.length >4 && details.description.length > 9){ //if the details title is more then 4 and description is more then 9 then set the second step to completed 
            if(!steps[1].completed) setComplete(1, true);
        }else{
            if(steps[1].completed) setComplete(1, false); // if the conditions are wrong then change the state to unfinished 
        }
    },[details]);

    useEffect(()=>{ // check the location step 
        if(location.lng ||  location.lat){ // if the location lat, lng are present then the step is set to complete
            if(!steps[0].completed) setComplete(0, true);
        }else{
            if(steps[0].completed) setComplete(0, false); // if none are prestn then step incompelete
        }
    },[location]);

    //this is responsible for making sure that all the steps are completed using the function fnd unfinished 
    useEffect(()=>{ //
        if(findUnfinished() === -1){ //cannot find any unfinished 
            if(!showSubmit) setShowSubmit(true) // if all the steps are completed the show button 
        }else{
            if(showSubmit) setShowSubmit(false)
        }
    },[steps])

    const handleSubmit = ()=>{ //responsible for the submission of the gear to te actions 
        //creates an object called gear 
        const gear = {
            lng: location.lng,
            lat: location.lat,
            price: details.price,
            title: details.title,
            description: details.description,
            contactEmail: details.contactEmail,
            contactPhone: details.contactPhone,
            images,
        };
        //sending all the gear object and user and dispatch to the actions 
        createGear(gear, currentUser, dispatch );
    };

    const navigate = useNavigate();

    const handleCancel = ()=>{ // function which handle the cancellation of gear upload 
            dispatch({type:'UPDATE_SECTION', payload:0})
            clearGear(dispatch, currentUser, images)
    }

  return (
    <Container
        sx={{my:4}}
    >
        <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "20px" }}>Accounts which have been verified by the admin are allowed to create a listing.</p>
        </div>
        <Stepper
            alternativeLabel
            nonLinear // flexibale stepper
            activeStep={activeStep} // state for the step
            sx={{mb:3}}
        >
            {steps.map((step, index) =>(  // maps the steps recieving the step and index 
                <Step key={step.label}completed={step.completed}> {/**key is label step and completed is step.comleted */}
                    <StepButton onClick={()=> setActiveStep(index)}> {/**on click sets the active step  */}
                        {step.label}
                    </StepButton>
                </Step>
            ))}
        </Stepper>
        <Box
           sx ={{pb:7}} 
        >
                    {{
                        0:<AddLocation/>, // depending on the step the page shows
                        1:<AddDetails/>,
                        2:<AddImages/>,
                    }[activeStep]}
            
            <Stack
                direction='row'
                sx={{pt:2, justifyContent:'space-around'}}
            >
                <Button
                    color='inherit'
                    disabled= {!activeStep} // depends on active state if 0 then button is disabled 
                    onClick={()=>setActiveStep(activeStep => activeStep -1)} // when clicked back the index is -1 means it goes back taken away from active step
                >
                    Back
                </Button>
                <Button
                    disabled={checkDisabled()} // function to see if it is at the last step
                    onClick={handleNext} // handle the next action 
                >
                    Next
                </Button>
            </Stack>
            
                <Stack
                    sx={{alignItem:'center', justifyContent:'center', gap:2}} direction='row'
                >
                  {showSubmit && (  <Button // button submit 
                        variant='contained'
                        endIcon={<Send/>}
                        onClick={handleSubmit} // action carrie out when submit is pressed 
                    >
                        {updatedGear? 'Update':'Submit'}
                    </Button>)}
                    <Button variant='outlined' endIcon={<Cancel/>} onClick={handleCancel}>
                        Cancel
                    </Button>
                </Stack>
            
        </Box>
    </Container>
  )
}

export default AddGear

/*
The following sources helped to shape and create the following code 
https://www.youtube.com/watch?v=MpQbwtSiZ7E
https://www.youtube.com/watch?v=k3Vfj-e1Ma4&t=9062s
https://www.youtube.com/watch?v=YdBy9-0pER4&t=45609s
https://www.youtube.com/watch?v=CvCiNeLnZ00&t=7695s
https://www.youtube.com/watch?v=72iEz5iopqQ&t=770s
https://www.youtube.com/watch?v=eJ3YysWaP_A
https://www.youtube.com/watch?v=ANZNMaBODDY&list=PLufbXXGswL_pS6rdWbDO56oiZovLWE_rs
https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE
https://www.youtube.com/watch?v=Ldw3mFGyjDE&list=PL86WBCjNmqh5HQInLsyYW7g76_6eKcQLf
https://www.youtube.com/watch?v=R5RoYDEIhCI&list=PLy1nL-pvL2M5xNIuNapwmABwEy2uifAlY
https://www.youtube.com/watch?v=1vpwfDDyINk&list=PLyzY2l387AlMy6r_JhflipKqKrhVK17gP
Assistance from chatgpt was also used 
*/
