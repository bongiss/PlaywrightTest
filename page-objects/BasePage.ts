export default class BasePage {
    protected page: any;
    
    constructor(_page) {
        this.page = _page;
    }

    Login_Button = 'button.btn.btn-success:visible';
    Username_TextBox = 'input[name="login"]';
    Password_TextBox = 'input[name="password"]';
    UserLoggedin_text = 'span.nav-link.disabled';
    UserLogin_error = 'span.label.label-warning';

    async login(username:string,password:string){
        await this.page.fill(this.Username_TextBox,username);
        await this.page.fill(this.Password_TextBox,password);
        await this.page.click(this.Login_Button);
    }


    async verifyUserhasloggedIn(){
        await this.page.waitForSelector(this.UserLoggedin_text);
        return this.page.isVisible(this.UserLoggedin_text);
    }

    async loginError(){
        await this.page.waitForSelector(this.UserLogin_error);
        return this.page.isVisible(this.UserLogin_error);        
    }

}