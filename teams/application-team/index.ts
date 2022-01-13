import { ArnPrincipal } from '@aws-cdk/aws-iam';
import { ApplicationTeam } from '@aws-quickstart/ssp-amazon-eks';


export class TeamAwesome extends ApplicationTeam {
    constructor(name: string) {
        super({
            name: name,
            users: [
                new ArnPrincipal(`arn:aws:iam::136876205846:user/user1`),  
            ],
        teamManifestDir: './teams/application-team/'
        });
    }
}