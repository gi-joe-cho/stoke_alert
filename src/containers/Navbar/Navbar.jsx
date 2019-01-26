import React, { Component } from 'react';
import { Menu, Button, Icon, Popup } from 'semantic-ui-react';
import ModalSign from '../../components/Signup/Signup';

import { validateName, validatedZip, validateZipcode, validateUsername, validatePassword, validateRetype, validateEmail } from '../../utils/validations';

export default class MenuExampleTabularOnTop extends Component {
    state = { 
        activeItem: 'bio',
        first_name: '',
        last_name: '', 
        username: '',
        email: '',
        password: '',
        retype_password:'',
        year: '',
        month: '',
        date: '',
        birth_date: '',
        city: '',
        state: '',
        zipcode: '',
        annotation: '',
        created_at: '',
        updated_at: '', 
        submittedName: '', 
        submittedEmail: '',
        valid_city: '',
        modalOpen: false,
        submitClick:false,
        validations: {
            first_name: true,
            email: true,
            password: true,
            passwordMatch: true,
            last_name: true,
            username: true,
            state: true,
            city: true,
            zipcode: true,
            city_zip_state: true,
            month: true,
            date: true,
            year: true
        }
    }
  
    closeConfig = () => {
        this.setState({ modalOpen: true })
    }
    close = () => this.setState({ modalOpen: false })

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    handleChange = (e, { name, value }) => {
        this.setState(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        });        
    } 

    handleSubmit = () => {
        const { name, email } = this.state;
        this.setState({ submittedName: name, submittedEmail: email })
    }
    
    checkAllInputValidations = () => {
        const { first_name, email, password, retype_password, last_name, username, zipcode, city, state, month, date, year } = this.state;

        let submitChanges = true;
        
        if (!validateName(first_name)) {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, first_name: false },
            }));
            submitChanges = false;
        } else {
                this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, first_name: true },
            }));
        }

        if (!validateName(last_name)) {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, last_name: false },
            }));
            submitChanges = false;
        } else {
                this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, last_name: true },
            }));
        }

        if (!validateUsername(username)) {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, username: false },
            }));
            submitChanges = false;
        } else {
                this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, username: true },
            }));
        }

        if (!validateZipcode(zipcode)) {
                this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, zipcode: false },
            }));
            submitChanges = false;
        } else {
                this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, zipcode: true },
            }));
        }

        if (!validateName(city)) {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, city: false },
            }));
            submitChanges = false;
        } else {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, city: true },
            }));
        }

        if (!validateName(state)) {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, state: false },
            }));
            submitChanges = false;
        } else {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, state: true },
            }));
        }

        if (!validatePassword(password, retype_password)) {
                this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, password: false },
            }));
            submitChanges = false;
        } else {
                this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, password: true },
            }));
        }

        if (!validateRetype(password, retype_password)) {
                this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, passwordMatch: false },
            }));
            submitChanges = false;
        } else {
                this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, passwordMatch: true },
            }));
        }

        if (!validateName(month)) {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, month: false },
            }));
            submitChanges = false;
        } else {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, month: true },
            }));
        }

        if (!validateName(date)) {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, date: false },
            }));
            submitChanges = false;
        } else {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, date: true },
            }));
        }

        if (!validateName(year)) {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, year: false },
            }));
            submitChanges = false;
        } else {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, year: true },
            }));
        }

        if (!validateEmail(email)) {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, email: false },
            }));
            submitChanges = false;
        } else {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, email: true },
            }));
        }

        return submitChanges;
    }

    newUser = async () => {
        await fetch('http://localhost:8080/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                birth_date: `${this.state.year}-${this.state.month}-${this.state.date}`,
                city: this.state.city,
                state: this.state.state,
                zipcode: this.state.zipcode,
                annotation: this.state.annotation
            }),
            headers: {
                "Content-type": "application/json"
            }
        });
    }

    newClose = async () => {
        if (this.checkAllInputValidations()){
            const city = await validatedZip(this.state.zipcode);
            console.log(city);
            console.log(city.city);
            const validateCityZipState = (city) => {
                if (this.state.city.toLowerCase() === city.city.toLowerCase() && this.state.state === city.stateAbbreviation) {
                    this.setState(prevState => ({
                    ...prevState,
                    validations: { ...prevState.validations, city_zip_state: true },
                }));
                    return true
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        validations: { ...prevState.validations, city_zip_state: false },
                    }));
                        if(this.state.city.toLowerCase() !== city.city.toLowerCase()){
                            this.setState(prevState => ({
                                ...prevState,
                                validations: { ...prevState.validations, city: false },
                            }));
                        } else if (this.state.state !== city.stateAbbreviation) {
                            this.setState(prevState => ({
                                ...prevState,
                                validations: { ...prevState.validations, state: false },
                            }));
                        }
                    // if CITY ZIPCODE AND STATE DO NOT MATCH!!! flash will go here 
                    return false
                }
            }

        if (this.checkAllInputValidations() && validateCityZipState(city)) {
                this.newUser();
                this.close();
        } else {
            this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, city_zip_state: false },
            }));
        }

    } else {
        this.setState(prevState => ({
            ...prevState,
            validations: { ...prevState.validations, city_zip_state: false },
        }));
    }

}

    render() {
        const { 
            activeItem, value,
            first_name, 
            last_name,
            username, 
            retype_password,
            password, 
            email,
            month,
            date,
            year,
            city,
            state,
            zipcode,
            annotation,
            submittedName,
            submittedEmail,
            modalOpen,
            validations,
        } = this.state;

        return (
            <div className="navbar-container">
                <Menu attached='top' tabular >
                    <Menu.Item className="stoke-bar">
                        S T O K E - A L E R T
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <ModalSign
                                value={value}
                                first_name={first_name}
                                lastname={last_name}
                                username={username}
                                password={password}
                                retypepassword={retype_password}
                                email={email}
                                month={month}
                                date={date}
                                year={year}
                                city={city}
                                state={state}
                                zipcode={zipcode}
                                annotation={annotation}
                                submittedName={submittedName}
                                submittedEmail={submittedEmail}
                                handleSubmit={this.handleSubmit}
                                handleChange={this.handleChange}
                                newUser={this.newUser}
                                closeModal={this.close}
                                modalOpen={modalOpen}
                                closeConfig={this.closeConfig}
                                newClose={this.newClose}
                                isEnabled={this.checkAllInputValidations}
                                passwordValidation={validations.password}
                                passwordMatch={validations.passwordMatch}
                                firstNameValidation={validations.first_name}
                                lastNameValidation={validations.last_name}
                                zipcodeValidation={validations.zipcode}
                                stateValidation={validations.state}
                                cityValidation={validations.city}
                                usernameValidation={validations.username}
                                monthValidation={validations.month}
                                yearValidation={validations.year}
                                dateValidation={validations.date}
                                emailValidation={validations.email}
                                cityZipStateValidation={validations.city_zip_state}
                            />
                            <Button id="login">
                                <Popup trigger={<Icon name="close" />} content='Sign-out of your account' />
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Menu className="file-menu" attached='top' tabular>
                    <Menu.Item 
                        name='Home' 
                        active={activeItem === 'Home'} 
                        onClick={this.handleItemClick} 
                    >
                        <span className="under-line">H</span>
                        <span>ome</span>
                    </Menu.Item> 
                    
                    <Menu.Item 
                        name='New Post'
                        active={activeItem === 'New Post'}
                        onClick={this.handleItemClick}
                    >
                        <span className="under-line">N</span>
                        <span>ew Post</span>
                    </Menu.Item>

                    <Menu.Item
                        name='Profile'
                        active={activeItem === 'Profile'}
                        onClick={this.handleItemClick}
                    >
                        <span className="under-line">P</span>
                        <span>rofile</span>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
