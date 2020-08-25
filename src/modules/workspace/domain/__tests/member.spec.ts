import { Member, CreateMemberProps } from '../member';
import { MemberFullName, MEMBER_FULL_NAME_MIN_LENGTH } from '../memberFullName';
import { MemberDisplayName, MEMBER_DISPLAY_NAME_MIN_LENGTH } from '../memberDisplayName';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { UserId } from '../../../user/domain/userId';
import { WorkspaceId } from '../workspaceId';

describe('Member', () => {
  describe('create', () => {
    const fullName = MemberFullName.create({
      value: 'a'.repeat(MEMBER_FULL_NAME_MIN_LENGTH),
    }).getValue();
    const displayName = MemberDisplayName.create({
      value: 'a'.repeat(MEMBER_DISPLAY_NAME_MIN_LENGTH),
    }).getValue();
    const userId = UserId.create().getValue();
    const workspaceId = WorkspaceId.create().getValue();

    const memberData: CreateMemberProps = {
      fullName,
      displayName,
      userId,
      workspaceId,
      isActive: true,
      isVerified: true,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return a user', () => {
      const memberId = new UniqueEntityID();
      const memberOrError = Member.create(memberData, memberId);

      expect(memberOrError.isError).toBeFalsy();

      const member = memberOrError.getValue();
      expect(member.id).toEqual(memberId);
      expect(member.userId).toEqual(memberData.userId);
      expect(member.workspaceId).toEqual(memberData.workspaceId);
      expect(member.fullName).toEqual(memberData.fullName);
      expect(member.displayName).toEqual(memberData.displayName);
      expect(member.isActive).toEqual(memberData.isActive);
      expect(member.isVerified).toEqual(memberData.isVerified);
      expect(member.isAdmin).toEqual(memberData.isAdmin);
      expect(member.createdAt).toEqual(memberData.createdAt);
      expect(member.updateAt).toEqual(memberData.updatedAt);
    });

    it('should return a new workspace with id when one is not provided', () => {
      const memberOrError = Member.create(memberData);

      expect(memberOrError.isError).toBeFalsy();

      const member = memberOrError.getValue();
      expect(member.id).toBeDefined();
      expect(member.userId).toEqual(memberData.userId);
      expect(member.workspaceId).toEqual(memberData.workspaceId);
    });

    it('should setup the default values when the optional properties are not provided', () => {
      const requiredMemberData: CreateMemberProps = {
        fullName: memberData.fullName,
        userId: memberData.userId,
        workspaceId: memberData.workspaceId,
      };

      const memberOrError = Member.create(requiredMemberData);

      expect(memberOrError.isError).toBeFalsy();

      const member = memberOrError.getValue();
      expect(member.id).toBeDefined();
      expect(member.userId).toEqual(requiredMemberData.userId);
      expect(member.workspaceId).toEqual(requiredMemberData.workspaceId);
      expect(member.isActive).toBeTruthy();
      expect(member.isAdmin).toBeFalsy();
      expect(member.isVerified).toBeFalsy();
      expect(member.createdAt).toBeDefined();
      expect(member.updateAt).toBeDefined();
    });
  });
});
