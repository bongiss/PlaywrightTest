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
    Comment_textArea = 'textarea[id="comment"]';
    Vote_button = 'button.btn.btn-success';
    VoteCount_label = 'h4 strong';
    ThankYou_label = 'p.card-text';
    Engine_label = 'li strong';
    OverallRating_table = 'table.cars.table.table-hover';
    AuthorFirstRow_table = 'tr td:nth-child(2)';
    RankingFirstRow_table = 'tr td:nth-child(4)';
    RankHeader_table = 'tr th:nth-child(4)'; 


    
    async goto_homepage(){
        await this.page.click(this.BuggyRating_nav_logo);
    }

    async clickPopularMakeSection(){
        await this.page.waitForSelector(':nth-match('+ this.PopularMake_img + ',1)');
        await this.page.click(':nth-match('+ this.PopularMake_img + ',1)');
    }

    async clickPopularModelSection(){
        await this.page.waitForSelector(':nth-match('+ this.PopularMake_img + ',2)');
        await this.page.click(':nth-match('+ this.PopularMake_img + ',2)');
    }

    async clickOverallRatingSection(){
        await this.page.waitForSelector(':nth-match('+ this.PopularMake_img + ',3)');
        await this.page.click(':nth-match('+ this.PopularMake_img + ',3)');
    }
    
    async selectCarModel(){
        await this.page.waitForSelector(this.ModelList_img);
        const all = await this.page.$$(this.ModelList_img);
        const randomElement = Math.floor(Math.random() * (all.length - 1 + 1)) + 1;
        await this.page.click(':nth-match('+ this.ModelList_img + ','+ randomElement +')');
    }

    async verifyCarEngine(){
        await this.page.waitForSelector(this.Engine_label);
        return this.page.isVisible(':nth-match('+ this.Engine_label + ',1)');
    }

    async verifyMaxSpeed(){
        await this.page.waitForSelector(this.Engine_label);
        return this.page.isVisible(':nth-match('+ this.Engine_label + ',2)');
    }

    async enterComment(text:string){
        const votecount = await this.page.innerText(this.VoteCount_label);
        const nextvotecount = parseInt(votecount)+ 1;
        await this.page.waitForSelector(this.Comment_textArea);
        await this.page.fill(this.Comment_textArea, 'vote count from ' + votecount +' to ' + nextvotecount+ ' via ' + text);
    }

    async voteandverify(){
        const votecount = await this.page.innerText(this.VoteCount_label);
        await this.page.click(this.Vote_button);
        await this.page.waitForSelector(this.ThankYou_label);
        return votecount < this.page.innerText(this.VoteCount_label);
    }

    async verifyOverAllRatingTable(){
        await this.page.waitForSelector(this.OverallRating_table);
        return this.page.isVisible(this.OverallRating_table);
    }

    async verifyAuthorColumn(){
        await this.page.waitForSelector(this.AuthorFirstRow_table);
        return await this.page.innerText(this.AuthorFirstRow_table);
    }

    async sortbyRank(){
        await this.page.waitForSelector(this.RankHeader_table);
        await this.page.click(this.RankHeader_table);
    }

    async verifyRankColumn(){
        await this.page.waitForSelector(this.RankingFirstRow_table);
        return await this.page.innerText(this.RankingFirstRow_table);
    }


}
    



