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

export type Entry = {
  id: Scalars['ID'];
  metaData?: Maybe<MetaData>;
};

export type File = Entry & {
  __typename?: 'File';
  contentType: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  metaData?: Maybe<MetaData>;
  next?: Maybe<Scalars['String']>;
  prev?: Maybe<Scalars['String']>;
  thumbImageUrl: Scalars['String'];
};

export type Folder = Entry & {
  __typename?: 'Folder';
  id: Scalars['ID'];
  metaData?: Maybe<MetaData>;
};

export type MetaData = {
  __typename?: 'MetaData';
  attributes?: Maybe<Array<Array<Scalars['String']>>>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type MetaDataInput = {
  attributes?: InputMaybe<Array<Array<Scalars['String']>>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAttribute?: Maybe<MetaData>;
  /**
   * Adds new tag to a folder entry. If element does
   * exist it returns updated metadata object or null
   * otherwise.
   */
  addTag?: Maybe<MetaData>;
  removeAttribute?: Maybe<MetaData>;
  removeTag?: Maybe<MetaData>;
  setDescription?: Maybe<MetaData>;
  setMetaData?: Maybe<MetaData>;
  setTitle?: Maybe<MetaData>;
};


export type MutationAddAttributeArgs = {
  attribute: Array<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationAddTagArgs = {
  id: Scalars['String'];
  tag: Scalars['String'];
};


export type MutationRemoveAttributeArgs = {
  attributeKey: Scalars['String'];
  id: Scalars['String'];
};


export type MutationRemoveTagArgs = {
  id: Scalars['String'];
  tag: Scalars['String'];
};


export type MutationSetDescriptionArgs = {
  description: Scalars['String'];
  id: Scalars['String'];
};


export type MutationSetMetaDataArgs = {
  id: Scalars['String'];
  metaDataInput: MetaDataInput;
};


export type MutationSetTitleArgs = {
  id: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** returns list of all attributes used in repository */
  attributes: Array<Scalars['String']>;
  entries: Array<Entry>;
  entry?: Maybe<Entry>;
  /** returns list of all tags used in repository */
  tags: Array<Scalars['String']>;
};


export type QueryEntriesArgs = {
  id?: InputMaybe<Scalars['String']>;
  metaDataInput?: InputMaybe<MetaDataInput>;
};


export type QueryEntryArgs = {
  id: Scalars['String'];
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
  Entry: ResolversTypes['File'] | ResolversTypes['Folder'];
  File: ResolverTypeWrapper<File>;
  Folder: ResolverTypeWrapper<Folder>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  MetaData: ResolverTypeWrapper<MetaData>;
  MetaDataInput: MetaDataInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Entry: ResolversParentTypes['File'] | ResolversParentTypes['Folder'];
  File: File;
  Folder: Folder;
  ID: Scalars['ID'];
  MetaData: MetaData;
  MetaDataInput: MetaDataInput;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
};

export type EntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Entry'] = ResolversParentTypes['Entry']> = {
  __resolveType: TypeResolveFn<'File' | 'Folder', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metaData?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metaData?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType>;
  next?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  prev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbImageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Folder'] = ResolversParentTypes['Folder']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metaData?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['MetaData'] = ResolversParentTypes['MetaData']> = {
  attributes?: Resolver<Maybe<Array<Array<ResolversTypes['String']>>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAttribute?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationAddAttributeArgs, 'attribute' | 'id'>>;
  addTag?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationAddTagArgs, 'id' | 'tag'>>;
  removeAttribute?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationRemoveAttributeArgs, 'attributeKey' | 'id'>>;
  removeTag?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationRemoveTagArgs, 'id' | 'tag'>>;
  setDescription?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationSetDescriptionArgs, 'description' | 'id'>>;
  setMetaData?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationSetMetaDataArgs, 'id' | 'metaDataInput'>>;
  setTitle?: Resolver<Maybe<ResolversTypes['MetaData']>, ParentType, ContextType, RequireFields<MutationSetTitleArgs, 'id' | 'title'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  attributes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  entries?: Resolver<Array<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<QueryEntriesArgs, never>>;
  entry?: Resolver<Maybe<ResolversTypes['Entry']>, ParentType, ContextType, RequireFields<QueryEntryArgs, 'id'>>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Entry?: EntryResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Folder?: FolderResolvers<ContextType>;
  MetaData?: MetaDataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

