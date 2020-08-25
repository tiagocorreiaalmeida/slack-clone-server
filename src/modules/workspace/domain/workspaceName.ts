import { ValueObject } from '../../../shared/domain/ValueObject';
import { validator } from '../../../shared/utils/validator';
import { Result } from '../../../shared/core/Result';

interface WorkspaceNameProps {
  value: string;
}

export const WORKSPACE_NAME_MIN_LENGTH = 3;
export const WORKSPACE_NAME_MAX_LENGTH = 90;
export const INVALID_WORKSPACE_NAME_ERROR = `The workspace name must have between ${WORKSPACE_NAME_MIN_LENGTH} and ${WORKSPACE_NAME_MAX_LENGTH} characters.`;

export class WorkspaceName extends ValueObject<WorkspaceNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: WorkspaceNameProps) {
    super(props);
  }

  static create(props: WorkspaceNameProps): Result<WorkspaceName> {
    const isValidWorkspaceName = validator.isLength({
      value: props.value,
      min: WORKSPACE_NAME_MIN_LENGTH,
      max: WORKSPACE_NAME_MAX_LENGTH,
    });

    if (!isValidWorkspaceName) {
      return Result.fail<WorkspaceName>(INVALID_WORKSPACE_NAME_ERROR);
    }

    return Result.success<WorkspaceName>(new WorkspaceName(props));
  }
}
