import BasePage from "../BasePage";

export class RegisterPage extends BasePage{

    constructor(_page: any) {
        super(_page);
    }

    Register_Button = 'a.btn.btn-success-outline';
    Username_TextBox = 'input[id="username"]';
    FirstName_TextBox = 'input[id="firstName"]';
    LastName_TextBox = 'input[id="lastName"]';
    Password_TextBox = 'input[id="password"]';
    ConfirmPassword_TextBox = 'input[name="confirmPassword"]';
    Register_Button_bottom = 'button.btn.btn-default';
    Registration_successful = 'div.result.alert.alert-success';
    Registration_error = 'div.result.alert.alert-danger';

    async register(username:string,firstname:string,lastname:string,password:string){
        this.page.click(this.Register_Button);
        await this.page.fill(this.Username_TextBox,username);
        await this.page.fill(this.FirstName_TextBox,firstname);
        await this.page.fill(this.LastName_TextBox,lastname);
        await this.page.fill(this.Password_TextBox,password);
        await this.page.fill(this.ConfirmPassword_TextBox,password);
        await this.page.click(this.Register_Button_bottom);
    }

    async verifyRegistrationSuccessful(){
        await this.page.waitForSelector(this.Registration_successful);
        return await this.page.isVisible(this.Registration_successful);
    }

    async verifyRegistrationError(){
        await this.page.waitForSelector(this.Registration_error);
        return await this.page.isVisible(this.Registration_error);
    }


}
    



