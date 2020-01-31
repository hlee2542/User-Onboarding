import React, {useState} from 'react';
import { withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import User from './User'

const UserForm = ({values, errors, touched, isSubmitting}) => {
    let [users, setUsers] = useState([]);
    const handleData = (event) => {
        event.preventDefault();
        if (values.tos) {
            fetch('https://reqres.in/api/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                    .then(data => {
                        //console.log(data);
                        setUsers(users.concat([data]));
                    });
        } else {
            console.log('You need to read the Terms of Service first.');
        }
    }
    return (
        <Form onSubmit={(event) => handleData(event)}>
            <p>{users.length ? users.map(user => <User name={user.name} email={user.email}/>) : null}</p>
            {touched.name && errors.name && <p>{errors.name}</p>}
            <Field type='text' name='name' placeholder='Name' />
            <br/>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field type='email' name='email' placeholder='Email' />
            <br/>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field type='password' name='password' placeholder='Password' />
            <br/>
            <label htmlFor='terms of service'>
                <Field type="checkbox" name="tos" checked={values.tos} />
                Terms of Service
            </label>
            <br/>
            <button disabled={isSubmitting}>Submit</button>
        </Form>
    );
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, tos}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false,
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().strict(true).uppercase('Your name must be all uppercase').required('You need a name.'),
        email: Yup.string().email('You need a valid email.').required('You need an email.'),
        password: Yup.string().min(9, "9 character minimum.").required('You need a password.')
    }),
    /*
    handleSubmit(values, {resetForm, setErrors, setSubmitting, setStatus}) {
        if (values.tos) {
            fetch('https://reqres.in/api/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        resetForm();
                        setSubmitting(false);
                    });
        } else {
            setErrors({tos: 'You need to read the Terms of Service first.'});
            setSubmitting(false);
        }
    }
    */
})(UserForm);

export default FormikUserForm;