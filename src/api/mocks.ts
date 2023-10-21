import { rand } from "@/utils";
import { TReport } from ".";

export function generateReport(): TReport {
  const a = mockErrors[rand(0, mockErrors.length - 1)];
  return {
    ...a,
    created_at: new Date().toString(),
    report_id: new Date().getTime() + "",
  };
}

export const mockErrors: Pick<TReport, "log">[] = [
  { log: "Unable to get integration token" },
  {
    log: "Pp3.Contracts.Dto.Contract.Action.ContractActionException: Действие по автоматическому отказу не разрешено",
  },
  { log: "Unable to process OnFlushDirty interceptors" },
  {
    log: "Ошибка обработки запроса на регистрацию/изменение данных компании id: 23264576 type: 'Customer'",
  },
  {
    log: `System.InvalidOperationException: У прямой закуки id=$14101044 отстуствует ФЗ
   at Granit.Cssp.Orm.Interceptors.PurchaseRequestInterceptor.Validate(PurchaseRequest purchaseRequest) in D:\pp2\source\Pp\Granit.Cssp\Orm\Interceptors\PurchaseRequestInterceptor.cs:line 55
   at Granit.Cssp.Orm.Interceptors.PurchaseRequestInterceptor.OnFlushDirty(Object entity, Object id, Object[] currentState, Object[] previousState, String[] propertyNames, IType[] types) in D:\pp2\source\Pp\Granit.Cssp\Orm\Interceptors\PurchaseRequestInterceptor.cs:line 26
   at Granit.Core.Data.NHibernate.Interceptors.CompositeInterceptor.<>c__DisplayClass3_0.<OnFlushDirty>b__0(IInterceptor inter) in D:\pp2\source\Granit\Granit.Core\Data\NHibernate\Interceptors\CompositeInterceptor.cs:line 38
   at System.Linq.Enumerable.Any[TSource](IEnumerable\`1 source, Func\`2 predicate)
   at Granit.Core.Data.NHibernate.Interceptors.CompositeInterceptor.OnFlushDirty(Object entity, Object id, Object[] currentState, Object[] previousState, String[] propertyNames, IType[] types) in D:\pp2\source\Granit\Granit.Core\Data\NHibernate\Interceptors\CompositeInterceptor.cs:line 43
   at NHibernate.Event.Default.DefaultFlushEntityEventListener.InvokeInterceptor(ISessionImplementor session, Object entity, EntityEntry entry, Object[] values, IEntityPersister persister)
   at NHibernate.Event.Default.DefaultFlushEntityEventListener.HandleInterception(FlushEntityEvent event)
   at NHibernate.Event.Default.DefaultFlushEntityEventListener.ScheduleUpdate(FlushEntityEvent event)
   at NHibernate.Event.Default.DefaultFlushEntityEventListener.OnFlushEntity(FlushEntityEvent event)
   at NHibernate.Event.Default.AbstractFlushingEventListener.FlushEntities(FlushEvent event)
   at NHibernate.Event.Default.AbstractFlushingEventListener.FlushEverythingToExecutions(FlushEvent event)
   at NHibernate.Event.Default.DefaultFlushEventListener.OnFlush(FlushEvent event)
   at NHibernate.Impl.SessionImpl.Flush()
   at NHibernate.Impl.SessionImpl.BeforeTransactionCompletion(ITransaction tx)
   at NHibernate.Transaction.AdoTransaction.Commit()
   at Granit.Core.Data.DataScope.Dispose() in D:\pp2\source\Granit\Granit.Core\Data\DataScope.cs:line 411`,
  },
  {
    log: `Execution error, job: Granit.Cssp.Jobs.PurchaseRequest.RequestAnswerExpiredToggleJob, key: 07ae0e0b-d2d6-4b64-865e-4cc382534059, args: {"Id":14101044}`,
  },
  {
    log: "Ошибка обработки запроса на регистрацию/изменение данных компании id: 23285587 type: 'Customer'",
  },
];
