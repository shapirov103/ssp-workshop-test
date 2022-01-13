import { ArnPrincipal } from '@aws-cdk/aws-iam';
import { ApplicationTeam } from '@aws-quickstart/ssp-amazon-eks';


export class TeamAwesome extends ApplicationTeam {
    constructor(name: string) {
        super({
            name: name,
            users: [
                new ArnPrincipal(`arn:aws:iam::902206886386:user/user1`),  
            ],
        teamManifestDir: './teams/application-team/'
        });
    }
}