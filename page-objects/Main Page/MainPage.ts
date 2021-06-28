import BasePage from "../BasePage";

export class MainPage extends BasePage{

    constructor(_page: any) {
        super(_page);
    }

    BuggyRating_nav_logo = 'a.navbar-brand';
    PopularMake_img = "img.img-fluid.center-block";
    PopularModel_img = 'img.img-fluid.center-block';
    OverallRating_img = 'img.img-fluid.center-block';
    ModelList_img = 'img.img-thumbnail';
    Comment_textArea = 'textarea[id="comment"]'
    
    async goto_homepage(){
        await this.page.click(this.BuggyRating_nav_logo);
    }

    async clickPopularMake(){
        await this.page.waitForSelector(':nth-match('+ this.PopularMake_img + ',1)');
        await this.page.click(':nth-match('+ this.PopularMake_img + ',1)');
    }

    async clickCarModel(){
        await this.page.waitForSelector(this.ModelList_img);
        const all = await this.page.$$(this.ModelList_img);
        Math.floor(Math.random()*(all-1+1)+1);
        await this.page.click(':nth-match('+ this.ModelList_img + ',1)');
    }

    async enterComment(){
        await this.page.waitForSelector(this.Comment_textArea);
        await this.page.fill(this.Comment_textArea, 'beautiful car');
    }




}
    



