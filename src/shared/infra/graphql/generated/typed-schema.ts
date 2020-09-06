import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginPayload;
  register: User;
  confirm: Scalars['Boolean'];
  refreshToken: Scalars['String'];
  createWorkspace: Workspace;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationConfirmArgs = {
  data: ConfirmInput;
};


export type MutationCreateWorkspaceArgs = {
  data: CreateWorkspaceInput;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type ConfirmInput = {
  token: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  user: User;
  accessToken: Scalars['String'];
};

export type Member = {
  __typename?: 'Member';
  userId: Scalars['ID'];
  workspaceId: Scalars['ID'];
  fullName: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
};

export type Workspace = {
  __typename?: 'Workspace';
  name: Scalars['String'];
  ownerId: Scalars['ID'];
  members?: Maybe<Array<Maybe<Member>>>;
};

export type CreateWorkspaceInput = {
  name: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  LoginInput: LoginInput;
  RegisterInput: RegisterInput;
  ConfirmInput: ConfirmInput;
  LoginPayload: ResolverTypeWrapper<LoginPayload>;
  Member: ResolverTypeWrapper<Member>;
  Workspace: ResolverTypeWrapper<Workspace>;
  CreateWorkspaceInput: CreateWorkspaceInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Query: {};
  Mutation: {};
  Boolean: Scalars['Boolean'];
  LoginInput: LoginInput;
  RegisterInput: RegisterInput;
  ConfirmInput: ConfirmInput;
  LoginPayload: LoginPayload;
  Member: Member;
  Workspace: Workspace;
  CreateWorkspaceInput: CreateWorkspaceInput;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<ResolversTypes['LoginPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'data'>>;
  register?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'data'>>;
  confirm?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationConfirmArgs, 'data'>>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createWorkspace?: Resolver<ResolversTypes['Workspace'], ParentType, ContextType, RequireFields<MutationCreateWorkspaceArgs, 'data'>>;
};

export type LoginPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginPayload'] = ResolversParentTypes['LoginPayload']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = {
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  workspaceId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WorkspaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workspace'] = ResolversParentTypes['Workspace']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  User?: UserResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  LoginPayload?: LoginPayloadResolvers<ContextType>;
  Member?: MemberResolvers<ContextType>;
  Workspace?: WorkspaceResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
