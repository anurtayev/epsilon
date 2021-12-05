import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateEntryInput = {
  attributes?: InputMaybe<Array<Array<Scalars['String']>>>;
  id: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type DeleteEntryInput = {
  id: Scalars['String'];
};

export type Entry = {
  __typename?: 'Entry';
  attributes?: Maybe<Array<Array<Scalars['String']>>>;
  id: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type EntryConnection = {
  __typename?: 'EntryConnection';
  items?: Maybe<Array<Maybe<Entry>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEntry?: Maybe<Entry>;
  deleteEntry?: Maybe<Entry>;
  updateEntry?: Maybe<Entry>;
};


export type MutationCreateEntryArgs = {
  input: CreateEntryInput;
};


export type MutationDeleteEntryArgs = {
  input: DeleteEntryInput;
};


export type MutationUpdateEntryArgs = {
  input: UpdateEntryInput;
};

export type Query = {
  __typename?: 'Query';
  getEntry?: Maybe<Entry>;
  listEntries?: Maybe<EntryConnection>;
};


export type QueryGetEntryArgs = {
  id: Scalars['String'];
};


export type QueryListEntriesArgs = {
  filter?: InputMaybe<TableEntryFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onCreateEntry?: Maybe<Entry>;
  onDeleteEntry?: Maybe<Entry>;
  onUpdateEntry?: Maybe<Entry>;
};


export type SubscriptionOnCreateEntryArgs = {
  attributes?: InputMaybe<Array<Array<Scalars['String']>>>;
  id?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};


export type SubscriptionOnDeleteEntryArgs = {
  attributes?: InputMaybe<Array<Array<Scalars['String']>>>;
  id?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};


export type SubscriptionOnUpdateEntryArgs = {
  attributes?: InputMaybe<Array<Array<Scalars['String']>>>;
  id?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type TableBooleanFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
};

export type TableEntryFilterInput = {
  attributes?: InputMaybe<TableStringFilterInput>;
  id?: InputMaybe<TableStringFilterInput>;
  tags?: InputMaybe<TableStringFilterInput>;
};

export type TableFloatFilterInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  ge?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  le?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  notContains?: InputMaybe<Scalars['Float']>;
};

export type TableIdFilterInput = {
  beginsWith?: InputMaybe<Scalars['ID']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  ge?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  le?: InputMaybe<Scalars['ID']>;
  lt?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  notContains?: InputMaybe<Scalars['ID']>;
};

export type TableIntFilterInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  ge?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  le?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  notContains?: InputMaybe<Scalars['Int']>;
};

export type TableStringFilterInput = {
  beginsWith?: InputMaybe<Scalars['String']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  ge?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  le?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  notContains?: InputMaybe<Scalars['String']>;
};

export type UpdateEntryInput = {
  attributes?: InputMaybe<Array<Array<Scalars['String']>>>;
  id: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateEntryInput: CreateEntryInput;
  DeleteEntryInput: DeleteEntryInput;
  Entry: ResolverTypeWrapper<Entry>;
  EntryConnection: ResolverTypeWrapper<EntryConnection>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  TableBooleanFilterInput: TableBooleanFilterInput;
  TableEntryFilterInput: TableEntryFilterInput;
  TableFloatFilterInput: TableFloatFilterInput;
  TableIDFilterInput: TableIdFilterInput;
  TableIntFilterInput: TableIntFilterInput;
  TableStringFilterInput: TableStringFilterInput;
  UpdateEntryInput: UpdateEntryInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateEntryInput: CreateEntryInput;
  DeleteEntryInput: DeleteEntryInput;
  Entry: Entry;
  EntryConnection: EntryConnection;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  TableBooleanFilterInput: TableBooleanFilterInput;
  TableEntryFilterInput: TableEntryFilterInput;
  TableFloatFilterInput: TableFloatFilterInput;
  TableIDFilterInput: TableIdFilterInput;
  TableIntFilterInput: TableIntFilterInput;
  TableStringFilterInput: TableStringFilterInput;
  UpdateEntryInput: UpdateEntryInput;
};

export type EntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry']> = {
  attributes?: Resolver<Maybe<Array<Array<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EntryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['EntryConnection'] = ResolversParentTypes['EntryConnection']> = {
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Entry']>>>, ParentType, ContextType>;
  nextToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createEntry?: Resolver<Maybe<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<MutationCreateEntryArgs, 'input'>>;
  deleteEntry?: Resolver<Maybe<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<MutationDeleteEntryArgs, 'input'>>;
  updateEntry?: Resolver<Maybe<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<MutationUpdateEntryArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getEntry?: Resolver<Maybe<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<QueryGetEntryArgs, 'id'>>;
  listEntries?: Resolver<Maybe<ResolversTypes['EntryConnection']>, ParentType, ContextType, RequireFields<QueryListEntriesArgs, never>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  onCreateEntry?: SubscriptionResolver<Maybe<ResolversTypes['Entry']>, "onCreateEntry", ParentType, ContextType, RequireFields<SubscriptionOnCreateEntryArgs, never>>;
  onDeleteEntry?: SubscriptionResolver<Maybe<ResolversTypes['Entry']>, "onDeleteEntry", ParentType, ContextType, RequireFields<SubscriptionOnDeleteEntryArgs, never>>;
  onUpdateEntry?: SubscriptionResolver<Maybe<ResolversTypes['Entry']>, "onUpdateEntry", ParentType, ContextType, RequireFields<SubscriptionOnUpdateEntryArgs, never>>;
};

export type Resolvers<ContextType = any> = {
  Entry?: EntryResolvers<ContextType>;
  EntryConnection?: EntryConnectionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

