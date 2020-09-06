import { MemberRepo as IMemberRepo } from '../../../domain/repos/memberRepo';
import { Member } from '../../../domain/member';

export class InMemoryMemberRepo implements IMemberRepo {
  members: Member[];
  constructor() {
    this.members = [];
  }

  async save(member: Member): Promise<Member> {
    this.members.push(member);
    return member;
  }

  async findById(memberId: string): Promise<Member | null> {
    const member = this.members.find(
      (storedMember) => storedMember.id.value.toString() === memberId,
    );

    return member || null;
  }
}

export const MemberRepo = new InMemoryMemberRepo();
