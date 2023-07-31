Thank you for your interest in contributing to the Blockchain Operating System reference gateway - Near Discovery.  We welcome contributions from everyone.  Below are various bits of information to help you get started.  If you require additional help, please start a [Discussion](https://github.com/near/near-discovery/discussions).

## Next Steps

To learn more about how `near-discovery` works, checkout the guide to setup local development [here](https://github.com/near/near-discovery/blob/develop/README.md).


If you are looking for relatively simple tasks to familiarise yourself with
`near-discovery`, take a look at the issues labeled `good first issue`
[here](https://github.com/near/near-discovery/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).  If you see
one that looks interesting and is unassigned or has not been actively worked on
in some time, please go ahead and start working towards creating your first pull request.

If you have an idea for an enhancement to the Near Discovery, please submit a [feature request](https://github.com/near/near-discovery/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=)

## Pull Requests

All the contributions to `near-discovery` happen via Pull Requests.  Please follow the
following steps when creating a PR:

1. Fork the `near-discovery` repository and create a new branch to do you work there.
2. The branch can contain any number of commits.  When merged, all commits will
   be squashed into a single commit.
3. Thoroughly test your changes.
4. When ready, create a pull request against the `develop` branch of `near-discovery`.
5. Feel free to submit draft PRs to get early feedback and to make sure you are
   on the right track.
6. The PR name should follow the template: `<type>: <name>`.  Where `type` is:
   - `fix` for bug fixes;
   - `feat` for new features;
   - `refactor` for changes that reorganize code without adding new content;
   - `doc` for changes that change documentation or comments;
   - `test` for changes that introduce new tests;
   - `chore` for grunt tasks like updating dependencies.
7. The PR should also contain a description when appropriate to provide
   additional information to help the reviewer inspect the proposed change.

## After the PR is submitted

1. When all the comments from the reviewer(s) have been addressed, the reviewer should
approve the PR.
2. An approved PR will be merged automatically into `develop`, which is continuously deployed to [beta.near.org](https://beta.near.org)


## Release Schedule
Changes from `develop` are promoted to the `main` branch weekly, on Thursdays.
