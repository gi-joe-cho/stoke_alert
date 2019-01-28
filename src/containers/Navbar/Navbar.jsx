import React, { Component } from 'react';
import { Menu, Button, Icon, Popup } from 'semantic-ui-react';
import ModalSignUp from '../../components/Signup/Signup';

import { validateName, validateZip, validateZipcode, validateUsername, validatePassword, validateRetype, validateEmail } from '../../utils/validations';

export default class MenuExampleTabularOnTop extends Component {
    state = { 
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
            retype_password: true,
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

    changeValidation = (name, value) => {
           this.setState(prevState => ({
                ...prevState,
                validations: { ...prevState.validations, [name]: value },
            }));
    };

        validateCityZipState = async () => {
            if (this.state.city.length > 0 && this.state.state.length > 0 && this.state.zipcode.length > 0 ){
                const rCity = await validateZip(this.state.zipcode);
                if (this.state.city.toLowerCase() === rCity.city.toLowerCase() && this.state.state === rCity.stateAbbreviation) {
                    this.changeValidation('city_zip_state', true);
                    return true
                } else {
                    this.changeValidation('city_zip_state', false);
                        if(this.state.city.toLowerCase() !== rCity.city.toLowerCase()){
                            this.changeValidation('city', false);
                        } else if (this.state.state !== rCity.stateAbbreviation) {
                            this.changeValidation('state', false);
                        }
                    // if CITY ZIPCODE AND STATE DO NOT MATCH!!! flash will go here 
                    return false
                }
            } else {
                return false
            }
    }

    checkAllInputValidations = () => {
        const { first_name, email, password, retype_password, last_name, username, zipcode, city, state, month, date, year } = this.state;

        let submitChanges = true;
        
        if (!validateName(first_name)) {
            this.changeValidation('first_name', false);
            submitChanges = false;
        } else {
            this.changeValidation('first_name', true);
        }

        if (!validateName(last_name)) {
            this.changeValidation('last_name', false);
            submitChanges = false;
        } else {
            this.changeValidation('last_name', true);
        }

        if (!validateUsername(username)) {
                this.changeValidation('username', false);
            submitChanges = false;
        } else {
                this.changeValidation('username', true);
        }

        if (!validateZipcode(zipcode)) {
            this.changeValidation('zipcode', false);
            submitChanges = false;
        } else {
            this.changeValidation('zipcode', true);
        }

        if (!validateName(city)) {
            this.changeValidation('city', false);
            submitChanges = false;
        } else {
            this.changeValidation('city', true);
        }

        if (!validateName(state)) {
            this.changeValidation('state', false);
            submitChanges = false;
        } else {
            this.changeValidation('state', true);
        }

        if (!validatePassword(password, retype_password)) {
            this.changeValidation('password', false);
            submitChanges = false;
        } else {
            this.changeValidation('password', true);
        }

        if (!validateRetype(password, retype_password)) {
            this.changeValidation('retype_password', false);
            submitChanges = false;
        } else {
            this.changeValidation('retype_password', true);
        }

        if (!validateName(month)) {
            this.changeValidation('month', false);
            submitChanges = false;
        } else {
            this.changeValidation('month', true);
        }

        if (!validateName(date)) {
            this.changeValidation('date', false);
            submitChanges = false;
        } else {
            this.changeValidation('date', true);
        }

        if (!validateName(year)) {
            this.changeValidation('year', false);
            submitChanges = false;
        } else {
            this.changeValidation('year', true);
        }

        if (!validateEmail(email)) {
            this.changeValidation('email', false);
            submitChanges = false;
        } else {
            this.changeValidation('email', true);
        }

        if (this.validateCityZipState()) {
            this.changeValidation('city_zip_state', true);
        } else {
            this.changeValidation('city_zip_state', false);
            submitChanges = false;
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

    newClose = () => {
            if (this.checkAllInputValidations() ) {
                    this.newUser();
                    this.close();
            } else {
                this.changeValidation('city_zip_state', false);
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
                            <ModalSignUp
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
                                validations={validations}
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
