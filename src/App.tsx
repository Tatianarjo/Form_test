import React from "react";
import { Formik, Field, Form, useField, FieldAttributes } from "formik";
import { Checkbox, FormControlLabel, Radio, TextField } from "@mui/material";
import { Button }  from "@mui/material";

type MyRadioProps = { label: string } & FieldAttributes<{}>

const MyRadio: React.FC<MyRadioProps> = ({label, ...props}) => {
    const [field] = useField<{}>(props);
    return (
        <FormControlLabel {...field} control={<Radio />} label={label} />
    )
}


const App: React.FC = () => {
    return (
        <div>
        <Formik 
        initialValues={{ firstName: "", lastName: "", isTall: "false", cookies: [], yogurt:""}}
         onSubmit={(data, { setSubmitting }) => {
             setSubmitting(true);
             //make async call
             console.log('submit:', data);
             setSubmitting(false);
         }}
         >
             {/* values represent the events I want to occur */}
             {({values, isSubmitting}) => (
            <Form>
                <Field 
                placeholder="firstname"
                name="firstName" 
                type= "input" 
                as={TextField} 
                />
                <div>
                <Field 
                placeholder="lastname"
                name="lastName" 
                type="input" 
                as={TextField} 
                />
                </div>
                <Field name="isTall" type="checkbox" as={Checkbox} />
                <div>cookies:</div>
                <Field name="cookies" type="checkbox" value="chocolate chip" as={Checkbox} />
                <Field name="cookies" type="checkbox" value="snickerdoodle" as={Checkbox} />
                <Field name="cookies" type="checkbox" value="sugar" as={Checkbox} />
                
                <div>yogurt</div>
                <MyRadio name="yogurt" type="radio" value="peach" label= "peach" />
                <MyRadio name="yogurt" type="radio" value="coconut" label= "coconut" />
                <MyRadio name="yogurt" type="radio" value="blueberry" label= "blueberry" />
                

                <div>
                <Button disabled={isSubmitting} type="submit">submit</Button>
                </div>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                {/* This allows it to display as we input information */}
            </Form>
        )}
        </Formik>
    </div>
    )
};

export default App;