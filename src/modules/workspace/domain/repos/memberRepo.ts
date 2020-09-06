import { Member } from '../member';

export interface MemberRepo {
  save(member: Member): Promise<Member>;
  findById(memberId: string): Promise<Member | null>;
}
