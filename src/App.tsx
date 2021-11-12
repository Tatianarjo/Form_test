import React from "react";
import { Formik } from "formik";
import { TextField } from "@mui/material";

const App: React.FC = () => {
    return (
        <div>
        <Formik 
        initialValues={{ firstName: "bob"}}
         onSubmit={data => {
             console.log('submit:', data);
         }}
         >
             {({values, handleChange, handleBlur, handleSubmit}) => (
            <form onSubmit={handleSubmit}>
                <TextField
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                
                <pre>{JSON.stringify(values, null, 2)}</pre>
                {/* This allows it to display as we input information */}
            </form>
        )}
        </Formik>
    </div>
    )
};

export default App;