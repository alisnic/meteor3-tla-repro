import { MongoInternals } from 'meteor/mongo';
import { ClientSession } from 'mongodb';

export async function runTransactionWithRetry<T>(asyncFunction: (session: ClientSession) => Promise<T>): Promise<T | null> {
  let result: T | null = null;

  await MongoInternals.defaultRemoteCollectionDriver().mongo.client.withSession(async session => {
    await session.withTransaction(async () => {
      result = await asyncFunction(session);
    });
  });

  return result;
}
