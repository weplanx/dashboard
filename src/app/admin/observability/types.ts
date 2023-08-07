import { Meta } from '@antv/g2plot';

export type ExporterName =
  | 'qps_rate'
  | 'error_rate'
  | 'p99'
  | 'mongo_available_connections'
  | 'mongo_open_connections'
  | 'mongo_commands_per_second'
  | 'mongo_query_operations'
  | 'mongo_document_operations'
  | 'mongo_flushes'
  | 'mongo_network_io'
  | 'redis_mem'
  | 'redis_cpu'
  | 'redis_ops_per_sec'
  | 'redis_evi_exp_keys'
  | 'redis_collections_rate'
  | 'redis_connected_slaves'
  | 'redis_hit_rate'
  | 'redis_network_io'
  | 'nats_cpu'
  | 'nats_mem'
  | 'nats_connections'
  | 'nats_subscriptions'
  | 'nats_slow_consumers'
  | 'nats_msg_io'
  | 'nats_bytes_io'
  | 'mem_heap_sys'
  | 'mem_heap_released'
  | 'mem_heap_alloc'
  | 'mem_heap_inuse'
  | 'mem_heap_idle'
  | 'mem_heap_objects'
  | 'mem_live_objects'
  | 'goroutines'
  | 'mem_lookups'
  | 'cgo_calls'
  | 'gc_count'
  | 'uptime';

export const MetaType: Record<string, Record<string, Meta>> = {
  default: {
    value: {
      alias: '数值'
    }
  },
  k: {
    value: {
      alias: '数值',
      formatter: v => {
        if (v > 1000000) {
          return (v / 1000000).toFixed(2) + ' 百万';
        }
        if (v > 10000) {
          return (v / 10000).toFixed(2) + ' 万';
        }
        return Math.trunc(v);
      }
    }
  },
  ms: {
    value: {
      alias: '毫秒',
      formatter: v => v + 'ms'
    }
  },
  fixed: {
    value: {
      alias: '数值',
      formatter: v => {
        return v.toFixed(2);
      }
    }
  },
  ops: {
    value: {
      alias: '数值',
      formatter: value => `${value} Ops`
    }
  },
  bytes: {
    value: {
      alias: '数值',
      formatter: v => {
        if (v > 1048576) {
          return (v / 1048576).toFixed(2) + ` Mb`;
        }
        if (v > 1024) {
          return (v / 1024).toFixed(2) + ` Kb`;
        }
        return `${v} b`;
      }
    }
  }
};