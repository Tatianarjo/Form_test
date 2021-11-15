import React from "react";
import { Formik, Field, Form, useField, FieldAttributes, FieldArray  } from "formik";
import { Checkbox, FormControlLabel, MenuItem, Radio, Select, TextField } from "@mui/material";
import { Button }  from "@mui/material";
import * as yup from 'yup';

type MyRadioProps = { label: string } & FieldAttributes<{}>

const MyRadio: React.FC<MyRadioProps> = ({label, ...props}) => {
    const [field] = useField<{}>(props);
    return (
        <FormControlLabel {...field} control={<Radio />} label={label} />
    )
}

const MyTextField: React.FC<FieldAttributes<{}>> = ({ placeholder, ...props}) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
        <TextField placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} />
    )
}

const validationSchema = yup.object({
    firstName: yup.string().required().max(10),
    pets: yup.array().of(
        yup.object({
            name: yup.string().required()
        })
    )
 

})


const App: React.FC = () => {
    return (
        <div>
        <Formik 
        initialValues={{ 
            firstName: "", 
            lastName: "", 
            isTall: "false", 
            cookies: [], 
            yogurt:"",
            pets: [{ type: "cat", name: "peaches", id: "" + Math.random() }]
        }}
        
        validationSchema={validationSchema}
        //Line 44 is used with Yup; it helps with errors like: max 10 letters
        // validate={(values) => {
            
        //     const errors: Record<string, string> = {};

        //     if (values.firstName.includes('bob')) {
        //         errors.firstName = 'no bob'
        //     }

        // return errors;
        // }
        // }
         onSubmit={(data, { setSubmitting }) => {
             setSubmitting(true);
             //make async call
             console.log('submit:', data);
             setSubmitting(false);
         }}
         >
             {/* values represent the events I want to occur */}
             {({values, errors, isSubmitting}) => (
            <Form>
                <MyTextField
                placeholder="firstname"
                name="firstName" 
                />
                <Field 
                
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
                
                <FieldArray name= "pets">
                    {arrayHelpers => (
                        <div>
                            <Button
                                onClick={() => 
                                    arrayHelpers.push({
                                        type: "frog",
                                        name: "",
                                        id: "" + Math.random()
                                    })
                                }
                                >
                                    add pet
                            </Button>
                            {values.pets.map((pet, index) => {
                                return (
                                <div key={pet.id}>
                                    <MyTextField placeholder="pet name" name={`pets.${index}.name`} />
                                    <Field 
                                    name={`pets.${index}.type`}
                                    type="select" 
                                    as={Select}
                                    >

                                    <MenuItem value="cat">cat</MenuItem>
                                    <MenuItem value="dog">dog</MenuItem>
                                    <MenuItem value="frog">frog</MenuItem>
                                    </Field>
                                    <Button onClick={() => arrayHelpers.remove(index)}>
                                        x
                                        </Button>
                                  </div> 
                                ); 
                                })}
                        </div>
                    )}
                </FieldArray>
                <div>
                <Button disabled={isSubmitting} type="submit">
                    submit
                </Button>
                </div>

                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre>

                {/* This allows it to display as we input information */}
            </Form>
        )}
        </Formik>
    </div>
    )
};

export default App;