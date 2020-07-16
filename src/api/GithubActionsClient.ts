/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { GithubActionsApi } from './GithubActionsApi';
import { Octokit } from '@octokit/rest';
import {
  ActionsListWorkflowRunsForRepoResponseData,
  ActionsGetWorkflowResponseData,
  ActionsGetWorkflowRunResponseData,
} from '@octokit/types';

export class GithubActionsClient implements GithubActionsApi {
  private api: Octokit;
  constructor({ api }: { api: Octokit }) {
    this.api = api;
  }
  reRunWorkflow({
    owner,
    repo,
    runId,
  }: {
    owner: string;
    repo: string;
    runId: number;
  }) {
    this.api.actions.reRunWorkflow({
      owner,
      repo,
      run_id: runId,
    });
  }
  async listWorkflowRuns({
    owner,
    repo,
    pageSize = 100,
    page = 0,
  }: {
    owner: string;
    repo: string;
    pageSize?: number;
    page?: number;
  }): Promise<ActionsListWorkflowRunsForRepoResponseData> {
    const workflowRuns = await this.api.actions.listWorkflowRunsForRepo({
      owner,
      repo,
      per_page: pageSize,
      page,
    });
    return workflowRuns.data;
  }
  async getWorkflow({
    owner,
    repo,
    id,
  }: {
    owner: string;
    repo: string;
    id: number;
  }): Promise<ActionsGetWorkflowResponseData> {
    const workflow = await this.api.actions.getWorkflow({
      owner,
      repo,
      workflow_id: id,
    });
    return workflow.data;
  }
  async getWorkflowRun({
    owner,
    repo,
    id,
  }: {
    owner: string;
    repo: string;
    id: number;
  }): Promise<ActionsGetWorkflowRunResponseData> {
    const run = await this.api.actions.getWorkflowRun({
      owner,
      repo,
      run_id: id,
    });
    return run.data;
  }
}
